import { getContactDepartments, getOptionLabel } from "@/lib/appointmentOptions";

export type ContactMessageInput = {
  name: string;
  email: string;
  phone: string;
  department: string;
  message: string;
};

export async function parseContactForm(
  formData: FormData
): Promise<ContactMessageInput | { error: string }> {
  const departments = await getContactDepartments();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const departmentValue = String(formData.get("department") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !phone || !departmentValue || !message) {
    return { error: "Please fill in all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  return {
    name,
    email,
    phone,
    department: getOptionLabel(departments, departmentValue),
    message,
  };
}

export async function submitContactMessage(
  formData: FormData
): Promise<{ error?: string }> {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: formData,
  });

  const data = (await response.json()) as { error?: string };

  if (!response.ok) {
    return {
      error:
        data.error ??
        "Unable to send your message right now. Please try again or call us directly.",
    };
  }

  return {};
}
