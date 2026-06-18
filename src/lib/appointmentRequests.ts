import {
  getAppointmentDepartments,
  getAppointmentDoctors,
  getOptionLabel,
} from "@/lib/appointmentOptions";
import { createClient } from "@/utils/supabase/client";

export type AppointmentRequestInput = {
  name: string;
  email: string;
  phone: string;
  appointment_at: string;
  department: string;
  doctor: string;
  message: string | null;
};

async function parseAppointmentForm(
  formData: FormData
): Promise<AppointmentRequestInput | { error: string }> {
  const [departments, doctors] = await Promise.all([
    getAppointmentDepartments(),
    getAppointmentDoctors(),
  ]);

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const appointmentAtRaw = String(formData.get("date") ?? "").trim();
  const departmentValue = String(formData.get("department") ?? "").trim();
  const doctorValue = String(formData.get("doctor") ?? "").trim();
  const messageRaw = String(formData.get("message") ?? "").trim();

  if (!name || !email || !phone || !appointmentAtRaw || !departmentValue || !doctorValue) {
    return { error: "Please fill in all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const appointmentAt = new Date(appointmentAtRaw);
  if (Number.isNaN(appointmentAt.getTime())) {
    return { error: "Please choose a valid appointment date and time." };
  }

  if (appointmentAt.getTime() < Date.now()) {
    return { error: "Please choose a future appointment date and time." };
  }

  return {
    name,
    email,
    phone,
    appointment_at: appointmentAt.toISOString(),
    department: getOptionLabel(departments, departmentValue),
    doctor: getOptionLabel(doctors, doctorValue),
    message: messageRaw || null,
  };
}

export async function submitAppointmentRequest(
  formData: FormData
): Promise<{ error?: string }> {
  const parsed = await parseAppointmentForm(formData);

  if ("error" in parsed) {
    return { error: parsed.error };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return { error: "Appointment form is not configured. Please call us directly." };
  }

  const supabase = createClient();
  const { error } = await supabase.from("appointment_requests").insert(parsed);

  if (error) {
    console.error("Appointment submission failed:", error.message);
    return {
      error: "Unable to submit your appointment right now. Please try again or call us directly.",
    };
  }

  return {};
}
