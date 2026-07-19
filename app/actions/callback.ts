"use server";

import { z } from "zod";

// Schlanke Rückruf-Action für Landingpages (Ad-Conversion): Name + Telefon
// genügen. Gleiche Schutz-/Datenschutz-Prinzipien wie submitLead.

const FIELDS = ["name", "phone", "note"] as const;
export type CallbackField = (typeof FIELDS)[number];

export type CallbackState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<CallbackField, string>>;
};

const schema = z.object({
  name: z.string().trim().min(2, "Bitte geben Sie Ihren Namen an.").max(100),
  phone: z
    .string()
    .trim()
    .min(5, "Bitte geben Sie Ihre Telefonnummer an.")
    .max(50),
  note: z.string().trim().max(2000).optional(),
});

export async function submitCallback(
  _prev: CallbackState,
  formData: FormData,
): Promise<CallbackState> {
  if (String(formData.get("leave_blank") ?? "").length > 0) return { ok: true };
  const ts = Number(formData.get("ts"));
  if (Number.isFinite(ts) && ts > 0 && Date.now() - ts < 1500) return { ok: true };

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Partial<Record<CallbackField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (
        typeof key === "string" &&
        (FIELDS as readonly string[]).includes(key) &&
        !fieldErrors[key as CallbackField]
      ) {
        fieldErrors[key as CallbackField] = issue.message;
      }
    }
    return { ok: false, error: "Bitte prüfen Sie die markierten Felder.", fieldErrors };
  }

  const data = parsed.data;
  // TODO(backend): Rückruf mandantengebunden in Supabase `leads` schreiben +
  // Benachrichtigung (Resend). Braucht Zugangsdaten. Bis dahin PII-frei loggen.
  console.info("[callback] eingegangen", {
    source: String(formData.get("source") || "landingpage"),
    hasNote: Boolean((data.note ?? "").length),
  });

  return { ok: true };
}
