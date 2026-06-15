import { createClient } from "@/utils/supabase/client";

export type ContactMessageInput = {
  name: string;
  email: string;
  phone: string;
  department: string;
  message: string;
};

function parseContactForm(formData: FormData): ContactMessageInput | { error: string } {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const department = String(formData.get("department") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !phone || !department || !message) {
    return { error: "Please fill in all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  return { name, email, phone, department, message };
}

export async function submitContactMessage(
  formData: FormData
): Promise<{ error?: string }> {
  const parsed = parseContactForm(formData);

  if ("error" in parsed) {
    return { error: parsed.error };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return { error: "Contact form is not configured. Please call us directly." };
  }

  const supabase = createClient();
  const { error } = await supabase.from("contact_messages").insert(parsed);

  if (error) {
    console.error("Contact form submission failed:", error.message);
    return {
      error: "Unable to send your message right now. Please try again or call us directly.",
    };
  }

  return {};
}
