"use server";

import { z } from "zod";

import { sendNotification, deliveryFallbackMessage } from "@/lib/mail";

// Server Action für die öffentlichen Lead-Formulare (Kontakt + Grundstück).
// Validiert serverseitig als Single Source of Truth, schützt gegen Bot-Spam und
// meldet feldbezogene Fehler zurück.
//
// Die Anfrage wird per E-Mail zugestellt (lib/mail.ts). Schlägt das fehl oder
// ist kein Versand konfiguriert, MELDET DIE ACTION KEINEN ERFOLG – der Absender
// bekommt stattdessen Telefonnummer und E-Mail-Adresse genannt.
// ERGÄNZEN: zusätzliche Persistenz in Supabase `leads` (Service-Role-Client,
// NICHT anon), sobald die Zugangsdaten vorliegen.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELDS = [
  "name",
  "contact",
  "email",
  "message",
  "phone",
  "topic",
  "plot_size",
  "plot_address",
] as const;
export type LeadField = (typeof FIELDS)[number];

export type LeadState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<LeadField, string>>;
};

const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Bitte geben Sie Ihren Namen an.")
    .max(100, "Der Name ist zu lang."),
  contact: z
    .string()
    .trim()
    .min(5, "Bitte geben Sie eine Telefonnummer oder E-Mail-Adresse an.")
    .max(150, "Die Angabe ist zu lang."),
  email: z.string().trim().max(150).optional(),
  message: z.string().trim().max(5000, "Die Nachricht ist zu lang.").optional(),
  phone: z.string().trim().max(50, "Die Telefonnummer ist zu lang.").optional(),
  topic: z.string().trim().max(120).optional(),
  plot_size: z.string().trim().max(50).optional(),
  plot_address: z.string().trim().max(200, "Die Adresse ist zu lang.").optional(),
  subject: z.string().trim().max(120).optional(),
});

export async function submitLead(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  // 1) Honeypot: unsichtbares Feld – von Menschen leer, von Bots ausgefüllt.
  if (String(formData.get("leave_blank") ?? "").length > 0) {
    return { ok: true }; // Erfolg vortäuschen, aber keinen Lead erzeugen
  }

  // 2) Zeitfalle: Absenden < 1,5 s nach Seitenaufbau ist praktisch immer ein Bot.
  const ts = Number(formData.get("ts"));
  if (Number.isFinite(ts) && ts > 0 && Date.now() - ts < 1500) {
    return { ok: true };
  }

  const parsed = leadSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Partial<Record<LeadField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (
        typeof key === "string" &&
        (FIELDS as readonly string[]).includes(key) &&
        !fieldErrors[key as LeadField]
      ) {
        fieldErrors[key as LeadField] = issue.message;
      }
    }
    return {
      ok: false,
      error: "Bitte prüfen Sie die markierten Felder.",
      fieldErrors,
    };
  }

  const lead = parsed.data;
  const message = (lead.message ?? "").trim();
  const contact = lead.contact.trim();
  const replyTo = EMAIL_RE.test(contact) ? contact : undefined;
  const hasPlot = Boolean(
    (lead.plot_size ?? "").length || (lead.plot_address ?? "").length,
  );
  const subject = lead.subject ?? "Anfrage über die Website";

  const delivery = await sendNotification({
    subject: `${subject} – ${lead.name}`,
    fields: [
      ["Name", lead.name],
      ["Kontakt", contact],
      ["Thema", lead.topic],
      ["Grundstücksgröße", lead.plot_size],
      ["Grundstücksadresse", lead.plot_address],
      ["Nachricht", message],
    ],
    // „Antworten“ im Postfach geht direkt an den Interessenten.
    replyTo,
  });

  if (!delivery.ok) {
    // Niemals Erfolg melden, wenn die Anfrage nirgends angekommen ist.
    console.error("[lead] Zustellung fehlgeschlagen", {
      reason: delivery.reason,
      subject,
    });
    return { ok: false, error: deliveryFallbackMessage() };
  }

  // Nur Metadaten – niemals PII in die Logs (DSGVO).
  console.info("[lead] zugestellt", {
    subject,
    messageLength: message.length,
    contactType: replyTo ? "email" : "phone-or-other",
    hasPlot,
  });

  return { ok: true };
}
