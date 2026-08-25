"use server";

import { z } from "zod";

import { deliveryFallbackMessage, sendNotification } from "@/lib/mail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELDS = [
  "name",
  "email",
  "phone",
  "rooms",
  "household_size",
  "move_in",
  "max_rent",
  "message",
] as const;

export type RentalField = (typeof FIELDS)[number];

export type RentalState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<RentalField, string>>;
};

const rentalSchema = z.object({
  name: z.string().trim().min(2, "Bitte geben Sie Ihren Namen an.").max(100),
  email: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.")
    .max(150)
    .regex(EMAIL_RE, "Bitte geben Sie eine gültige E-Mail-Adresse an."),
  phone: z.string().trim().max(50).optional(),
  rooms: z.string().trim().min(1, "Bitte wählen Sie Ihre Wunschgröße.").max(30),
  household_size: z.string().trim().max(30).optional(),
  move_in: z.string().trim().max(80).optional(),
  max_rent: z.string().trim().max(50).optional(),
  message: z.string().trim().max(3000, "Die Nachricht ist zu lang.").optional(),
});

export async function submitRentalInterest(
  _previous: RentalState,
  formData: FormData,
): Promise<RentalState> {
  if (String(formData.get("leave_blank") ?? "").length > 0) {
    return { ok: true };
  }

  const timestamp = Number(formData.get("ts"));
  if (
    Number.isFinite(timestamp) &&
    timestamp > 0 &&
    Date.now() - timestamp < 1500
  ) {
    return { ok: true };
  }

  const parsed = rentalSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Partial<Record<RentalField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (
        typeof key === "string" &&
        (FIELDS as readonly string[]).includes(key) &&
        !fieldErrors[key as RentalField]
      ) {
        fieldErrors[key as RentalField] = issue.message;
      }
    }
    return {
      ok: false,
      error: "Bitte prüfen Sie die markierten Felder.",
      fieldErrors,
    };
  }

  const interest = parsed.data;
  const delivery = await sendNotification({
    subject: `Mietwohnung gesucht – ${interest.name}`,
    fields: [
      ["Name", interest.name],
      ["E-Mail", interest.email],
      ["Telefon", interest.phone],
      ["Wunschgröße", interest.rooms],
      ["Personen im Haushalt", interest.household_size],
      ["Gewünschter Einzug", interest.move_in],
      ["Maximale Kaltmiete", interest.max_rent],
      ["Weitere Wünsche", interest.message],
    ],
    replyTo: interest.email,
  });

  if (!delivery.ok) {
    console.error("[rental-interest] Zustellung fehlgeschlagen", {
      reason: delivery.reason,
    });
    return { ok: false, error: deliveryFallbackMessage() };
  }

  console.info("[rental-interest] zugestellt", {
    hasPhone: Boolean(interest.phone),
    hasMoveIn: Boolean(interest.move_in),
  });

  return { ok: true };
}
