import { NextResponse } from "next/server";

import { parseAppointmentForm } from "@/lib/appointmentRequests";
import { sendAppointmentEmails } from "@/lib/mail";
import { createPublicSupabaseClient } from "@/lib/supabase/public-server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = await parseAppointmentForm(formData);

  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const supabase = createPublicSupabaseClient();
    const { error } = await supabase.from("appointment_requests").insert(parsed);

    if (error) {
      console.error("Appointment submission failed:", error.message);
      return NextResponse.json(
        {
          error:
            "Unable to submit your appointment right now. Please try again or call us directly.",
        },
        { status: 500 }
      );
    }

    try {
      await sendAppointmentEmails(parsed);
    } catch (emailError) {
      console.error("Appointment email delivery failed:", emailError);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Appointment form is not configured. Please call us directly." },
      { status: 500 }
    );
  }
}
