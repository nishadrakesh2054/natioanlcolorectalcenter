"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function getAdminUser() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function requireAdminUser() {
  const user = await getAdminUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function getAdminSupabase() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}
