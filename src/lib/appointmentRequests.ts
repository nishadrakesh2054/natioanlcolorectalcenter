import {
  getAppointmentDepartments,
  getAppointmentDoctors,
  getOptionLabel,
} from "@/lib/appointmentOptions";

export type AppointmentRequestInput = {
  name: string;
  email: string;
  phone: string;
  age: string | null;
  gender: string | null;
  weight: string | null;
  appointment_at: string;
  department: string;
  doctor: string;
  message: string | null;
};

export async function parseAppointmentForm(
  formData: FormData
): Promise<AppointmentRequestInput | { error: string }> {
  const [departments, doctors] = await Promise.all([
    getAppointmentDepartments(),
    getAppointmentDoctors(),
  ]);

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const ageRaw = String(formData.get("age") ?? "").trim();
  const genderRaw = String(formData.get("gender") ?? "").trim();
  const weightRaw = String(formData.get("weight") ?? "").trim();
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
    age: ageRaw || null,
    gender: genderRaw || null,
    weight: weightRaw || null,
    appointment_at: appointmentAt.toISOString(),
    department: getOptionLabel(departments, departmentValue),
    doctor: getOptionLabel(doctors, doctorValue),
    message: messageRaw || null,
  };
}

export async function submitAppointmentRequest(
  formData: FormData
): Promise<{ error?: string }> {
  const response = await fetch("/api/appointment", {
    method: "POST",
    body: formData,
  });

  const data = (await response.json()) as { error?: string };

  if (!response.ok) {
    return {
      error:
        data.error ??
        "Unable to submit your appointment right now. Please try again or call us directly.",
    };
  }

  return {};
}
