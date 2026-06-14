"use server";

// Server Action für die öffentlichen Lead-Formulare (Kontakt + Grundstück anbieten).
// Bewusst backend-frei lauffähig: validiert serverseitig und meldet Erfolg zurück,
// damit die Seiten schon vor der Backend-Anbindung vollständig funktionieren.

export type LeadState = { ok: boolean; error?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const subject = String(formData.get("subject") ?? "Anfrage").trim();

  if (name.length < 2) {
    return { ok: false, error: "Bitte geben Sie Ihren Namen an." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Bitte geben Sie eine gültige E-Mail-Adresse an." };
  }

  // TODO(backend): Lead mandantengebunden (DOHOme) in eine Supabase-Tabelle `leads`
  // schreiben (Service-Role-Client, NICHT der anon-Client) und Benachrichtigung
  // versenden – z. B. Supabase Edge Function + Resend/SMTP oder ein n8n-Webhook.
  // Bis dahin landet die Anfrage nur im Server-Log.
  console.info("[lead] eingegangen", {
    subject,
    name,
    email,
    hasMessage: message.length > 0,
  });

  return { ok: true };
}
