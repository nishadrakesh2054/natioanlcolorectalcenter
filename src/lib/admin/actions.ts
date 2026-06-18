"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { formValuesToRecord, getAdminResource, isInboxResource } from "@/lib/admin/resources";
import { revalidatePublicContent } from "@/lib/admin/revalidate-public";
import { getAdminSupabase, requireAdminUser } from "@/lib/admin/auth";

async function nextId(table: string): Promise<number> {
  const supabase = await getAdminSupabase();
  const { data, error } = await supabase
    .from(table)
    .select("id")
    .order("id", { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  return ((data?.[0]?.id as number | undefined) ?? 0) + 1;
}

function parseRecordId(rawId: string): string | number {
  const numericId = Number(rawId);
  if (Number.isFinite(numericId) && String(numericId) === rawId.trim()) {
    return numericId;
  }
  return rawId;
}

export async function createRecord(resourceSlug: string, values: Record<string, string>) {
  await requireAdminUser();
  const resource = getAdminResource(resourceSlug);
  if (!resource) {
    return { error: "Unknown resource" };
  }

  if (isInboxResource(resource)) {
    return { error: "Submissions cannot be created from the dashboard." };
  }

  let payload: Record<string, unknown>;
  try {
    payload = formValuesToRecord(resource, values);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to prepare record",
    };
  }

  payload.id = await nextId(resource.table);

  const supabase = await getAdminSupabase();
  const { error } = await supabase.from(resource.table).insert(payload);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/${resourceSlug}`);
  revalidatePublicContent(resourceSlug, String(payload.id));
  return { success: true as const };
}

export async function updateRecord(
  resourceSlug: string,
  rawId: string,
  values: Record<string, string>
) {
  await requireAdminUser();
  const resource = getAdminResource(resourceSlug);
  if (!resource) {
    return { error: "Unknown resource" };
  }

  if (isInboxResource(resource)) {
    return { error: "Submissions cannot be edited from the dashboard." };
  }

  let payload: Record<string, unknown>;
  try {
    payload = formValuesToRecord(resource, values);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to prepare record",
    };
  }

  delete payload.id;

  const supabase = await getAdminSupabase();
  const { error } = await supabase
    .from(resource.table)
    .update(payload)
    .eq("id", parseRecordId(rawId));

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/${resourceSlug}`);
  revalidatePublicContent(resourceSlug, rawId);
  return { success: true as const };
}

export async function deleteRecord(resourceSlug: string, rawId: string) {
  await requireAdminUser();
  const resource = getAdminResource(resourceSlug);
  if (!resource) {
    return { error: "Unknown resource" };
  }

  const supabase = await getAdminSupabase();
  const { error } = await supabase
    .from(resource.table)
    .delete()
    .eq("id", parseRecordId(rawId));

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/${resourceSlug}`);
  revalidatePublicContent(resourceSlug, rawId);
  return { success: true as const };
}

export async function signOut() {
  const supabase = await getAdminSupabase();
  await supabase.auth.signOut();
  redirect("/login");
}
