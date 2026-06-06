import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

// Serverseitig: diese Route wird vom Node-Adapter on-demand ausgeführt.
export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// --- Einfache In-Memory-Rate-Bremse pro IP -----------------------------------
// Hinweis: gilt pro laufendem Container (Scalingo: ein Container) und wird beim
// Neustart zurückgesetzt, als simpler Spam-/Missbrauchsschutz ausreichend.
const WINDOW_MS = 10 * 60 * 1000; // 10 Minuten
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

// --- Validierung -------------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function readBody(request: Request): Promise<Record<string, unknown>> {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    return (await request.json().catch(() => ({}))) as Record<string, unknown>;
  }
  const form = await request.formData().catch(() => null);
  if (!form) return {};
  return Object.fromEntries(form.entries());
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    clientAddress ||
    "unknown";

  if (rateLimited(ip)) {
    return json(
      { ok: false, error: "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut." },
      429,
    );
  }

  const body = await readBody(request);
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);
  const message = str(body.message);
  const datenschutz = body.datenschutz === true || body.datenschutz === "on" || body.datenschutz === "true";
  const honeypot = str(body.homepage);

  // Honeypot: still „erfolgreich" antworten, ohne Mail zu senden.
  if (honeypot.length > 0) {
    return json({ ok: true });
  }

  // Serverseitige Validierung
  const errors: string[] = [];
  if (name.length < 2 || name.length > 120) errors.push("Bitte geben Sie Ihren Namen an.");
  if (!EMAIL_RE.test(email) || email.length > 180) errors.push("Bitte geben Sie eine gültige E-Mail-Adresse an.");
  if (message.length < 5 || message.length > 3000) errors.push("Bitte geben Sie eine Nachricht ein.");
  if (phone.length > 40) errors.push("Die Telefonnummer ist zu lang.");
  if (!datenschutz) errors.push("Bitte stimmen Sie der Datenschutzerklärung zu.");

  if (errors.length > 0) {
    return json({ ok: false, error: errors.join(" ") }, 400);
  }

  // SMTP-Konfiguration aus ENV (keine Secrets im Code)
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, MAIL_TO, MAIL_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO || !MAIL_FROM) {
    console.error("[kontakt] SMTP/Mail-ENV unvollständig, Mailversand nicht möglich.");
    return json(
      {
        ok: false,
        error:
          "Der Versand ist derzeit nicht konfiguriert. Bitte kontaktieren Sie uns telefonisch oder per E-Mail.",
      },
      500,
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const safe = { name: escapeHtml(name), email: escapeHtml(email), phone: escapeHtml(phone || "-"), message: escapeHtml(message) };
  const text = `Neue Anfrage über das Kontaktformular\n\nName: ${name}\nE-Mail: ${email}\nTelefon: ${phone || "-"}\n\nNachricht:\n${message}\n`;
  const html = `
    <h2 style="font-family:Arial,sans-serif">Neue Anfrage über das Kontaktformular</h2>
    <table style="font-family:Arial,sans-serif;border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0"><strong>Name</strong></td><td>${safe.name}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>E-Mail</strong></td><td>${safe.email}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Telefon</strong></td><td>${safe.phone}</td></tr>
    </table>
    <p style="font-family:Arial,sans-serif"><strong>Nachricht:</strong></p>
    <p style="font-family:Arial,sans-serif;white-space:pre-wrap">${safe.message}</p>`;

  try {
    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: `${name} <${email}>`,
      subject: `Neue Anfrage von ${name}`,
      text,
      html,
    });
    return json({ ok: true });
  } catch (err) {
    console.error("[kontakt] Mailversand fehlgeschlagen:", err);
    return json(
      { ok: false, error: "Der Versand ist fehlgeschlagen. Bitte versuchen Sie es später erneut." },
      502,
    );
  }
};

// Andere Methoden ablehnen
export const ALL: APIRoute = () =>
  json({ ok: false, error: "Methode nicht erlaubt." }, 405);
