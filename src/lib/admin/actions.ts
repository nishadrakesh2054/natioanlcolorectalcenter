"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  formValuesToRecord,
  getAdminResource,
} from "@/lib/admin/resources";
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

export async function getRecord(resourceSlug: string, id: number) {
  await requireAdminUser();
  const resource = getAdminResource(resourceSlug);
  if (!resource) {
    throw new Error("Unknown resource");
  }

  const supabase = await getAdminSupabase();
  const { data, error } = await supabase
    .from(resource.table)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as Record<string, unknown> | null;
}

export async function createRecord(resourceSlug: string, values: Record<string, string>) {
  await requireAdminUser();
  const resource = getAdminResource(resourceSlug);
  if (!resource) {
    return { error: "Unknown resource" };
  }

  try {
    const payload = formValuesToRecord(resource, values);
    payload.id = await nextId(resource.table);

    const supabase = await getAdminSupabase();
    const { error } = await supabase.from(resource.table).insert(payload);

    if (error) {
      return { error: error.message };
    }

    revalidatePath(`/dashboard/${resourceSlug}`);
    revalidatePath("/");
    redirect(`/dashboard/${resourceSlug}`);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to create record" };
  }
}

export async function updateRecord(
  resourceSlug: string,
  id: number,
  values: Record<string, string>
) {
  await requireAdminUser();
  const resource = getAdminResource(resourceSlug);
  if (!resource) {
    return { error: "Unknown resource" };
  }

  try {
    const payload = formValuesToRecord(resource, values);
    delete payload.id;

    const supabase = await getAdminSupabase();
    const { error } = await supabase.from(resource.table).update(payload).eq("id", id);

    if (error) {
      return { error: error.message };
    }

    revalidatePath(`/dashboard/${resourceSlug}`);
    revalidatePath("/");
    redirect(`/dashboard/${resourceSlug}`);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to update record" };
  }
}

export async function deleteRecord(resourceSlug: string, id: number) {
  await requireAdminUser();
  const resource = getAdminResource(resourceSlug);
  if (!resource) {
    return { error: "Unknown resource" };
  }

  const supabase = await getAdminSupabase();
  const { error } = await supabase.from(resource.table).delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/${resourceSlug}`);
  revalidatePath("/");
  return { success: true };
}

export async function signOut() {
  const supabase = await getAdminSupabase();
  await supabase.auth.signOut();
  redirect("/login");
}
