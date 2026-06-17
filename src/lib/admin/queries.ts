import { getAdminResource } from "@/lib/admin/resources";
import { getAdminSupabase, requireAdminUser } from "@/lib/admin/auth";

function normalizeRecordId(rawId: string) {
  return rawId.trim();
}

function recordMatchesId(row: Record<string, unknown>, rawId: string) {
  return String(row.id) === normalizeRecordId(rawId);
}

export async function listRecords(resourceSlug: string) {
  await requireAdminUser();
  const resource = getAdminResource(resourceSlug);
  if (!resource) {
    throw new Error("Unknown resource");
  }

  const supabase = await getAdminSupabase();
  const order = resource.orderBy ?? { column: "id", ascending: true };

  const { data, error } = await supabase
    .from(resource.table)
    .select("*")
    .order(order.column, { ascending: order.ascending ?? true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Record<string, unknown>[];
}

export async function getRecord(resourceSlug: string, rawId: string) {
  const id = normalizeRecordId(rawId);
  if (!id) {
    return null;
  }

  const rows = await listRecords(resourceSlug);
  const match = rows.find((row) => recordMatchesId(row, id));
  if (match) {
    return match;
  }

  await requireAdminUser();
  const resource = getAdminResource(resourceSlug);
  if (!resource) {
    throw new Error("Unknown resource");
  }

  const supabase = await getAdminSupabase();
  const numericId = Number(id);
  const queryId = Number.isFinite(numericId) && String(numericId) === id ? numericId : id;

  const { data, error } = await supabase
    .from(resource.table)
    .select("*")
    .eq("id", queryId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Record<string, unknown> | null;
}
