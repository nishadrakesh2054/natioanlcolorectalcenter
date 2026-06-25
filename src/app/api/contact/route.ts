import { NextResponse } from "next/server";

import { parseContactForm } from "@/lib/contactMessages";
import { sendContactEmails } from "@/lib/mail";
import { createPublicSupabaseClient } from "@/lib/supabase/public-server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = await parseContactForm(formData);

  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const supabase = createPublicSupabaseClient();
    const { error } = await supabase.from("contact_messages").insert(parsed);

    if (error) {
      console.error("Contact form submission failed:", error.message);
      return NextResponse.json(
        {
          error:
            "Unable to send your message right now. Please try again or call us directly.",
        },
        { status: 500 }
      );
    }

    try {
      await sendContactEmails(parsed);
    } catch (emailError) {
      console.error("Contact email delivery failed:", emailError);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Contact form is not configured. Please call us directly." },
      { status: 500 }
    );
  }
}
