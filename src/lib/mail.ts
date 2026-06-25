import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

import type { AppointmentRequestInput } from "@/lib/appointmentRequests";
import type { ContactMessageInput } from "@/lib/contactMessages";
import { siteContact } from "@/lib/siteContact";

function getTransporter(): Transporter | null {
  const host = process.env.MAIL_HOST;
  const port = Number(process.env.MAIL_PORT ?? 587);
  const user = process.env.MAIL_USERNAME;
  const pass = process.env.MAIL_PASSWORD?.replace(/\s/g, "");
  const encryption = process.env.MAIL_ENCRYPTION ?? "tls";

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: encryption === "ssl",
    auth: { user, pass },
  });
}

function getFromAddress() {
  const user = process.env.MAIL_USERNAME ?? siteContact.email;
  return `${siteContact.name} <${user}>`;
}

function getAdminEmail() {
  return (
    process.env.ADMIN_EMAIL ??
    process.env.MAIL_USERNAME ??
    siteContact.email
  );
}

function formatAppointmentAt(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function sendEmail(to: string, subject: string, html: string) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Mail is not configured; skipping email delivery.");
    return;
  }

  await transporter.sendMail({
    from: getFromAddress(),
    to,
    subject,
    html,
  });
}

export async function sendContactEmails(data: ContactMessageInput) {
  const adminEmail = getAdminEmail();
  const safeName = escapeHtml(data.name);

  await Promise.all([
    sendEmail(
      adminEmail,
      `New contact message from ${data.name}`,
      `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Department:</strong> ${escapeHtml(data.department)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replaceAll("\n", "<br>")}</p>
      `
    ),
    sendEmail(
      data.email,
      `We received your message — ${siteContact.name}`,
      `
        <p>Hi ${safeName},</p>
        <p>Thank you for contacting ${siteContact.name}. We have received your message and will get back to you soon.</p>
        <p><strong>Department:</strong> ${escapeHtml(data.department)}</p>
        <p><strong>Your message:</strong></p>
        <p>${escapeHtml(data.message).replaceAll("\n", "<br>")}</p>
        <p>Phone: ${escapeHtml(siteContact.phones.display)}</p>
      `
    ),
  ]);
}

export async function sendAppointmentEmails(data: AppointmentRequestInput) {
  const adminEmail = getAdminEmail();
  const safeName = escapeHtml(data.name);
  const appointmentLabel = formatAppointmentAt(data.appointment_at);
  const optionalRows = [
    data.age ? `<p><strong>Age:</strong> ${escapeHtml(data.age)}</p>` : "",
    data.gender ? `<p><strong>Gender:</strong> ${escapeHtml(data.gender)}</p>` : "",
    data.weight ? `<p><strong>Weight:</strong> ${escapeHtml(data.weight)}</p>` : "",
    data.message
      ? `<p><strong>Message:</strong></p><p>${escapeHtml(data.message).replaceAll("\n", "<br>")}</p>`
      : "",
  ].join("");

  const details = `
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Appointment:</strong> ${escapeHtml(appointmentLabel)}</p>
    <p><strong>Department:</strong> ${escapeHtml(data.department)}</p>
    <p><strong>Doctor:</strong> ${escapeHtml(data.doctor)}</p>
    ${optionalRows}
  `;

  await Promise.all([
    sendEmail(
      adminEmail,
      `New appointment request from ${data.name}`,
      `<h2>New appointment request</h2>${details}`
    ),
    sendEmail(
      data.email,
      `Appointment request received — ${siteContact.name}`,
      `
        <p>Hi ${safeName},</p>
        <p>Thank you for booking with ${siteContact.name}. We have received your appointment request.</p>
        ${details}
        <p>Our team will contact you shortly to confirm your appointment.</p>
        <p>Phone: ${escapeHtml(siteContact.phones.display)}</p>
      `
    ),
  ]);
}
