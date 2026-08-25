"use server";

import { z } from "zod";

import { deliveryFallbackMessage, sendNotification } from "@/lib/mail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELDS = [
  "name",
  "contact",
  "rooms",
] as const;

export type RentalField = (typeof FIELDS)[number];

export type RentalState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<RentalField, string>>;
};

const rentalSchema = z.object({
  name: z.string().trim().min(2, "Bitte geben Sie Ihren Namen an.").max(100),
  contact: z
    .string()
    .trim()
    .min(5, "Bitte geben Sie eine Telefonnummer oder E-Mail-Adresse an.")
    .max(150, "Die Angabe ist zu lang."),
  rooms: z.string().trim().max(30).optional(),
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
  const replyTo = EMAIL_RE.test(interest.contact) ? interest.contact : undefined;
  const delivery = await sendNotification({
    subject: `Mietwohnung gesucht – ${interest.name}`,
    fields: [
      ["Name", interest.name],
      ["Kontakt", interest.contact],
      ["Wunschgröße", interest.rooms],
    ],
    replyTo,
  });

  if (!delivery.ok) {
    console.error("[rental-interest] Zustellung fehlgeschlagen", {
      reason: delivery.reason,
    });
    return { ok: false, error: deliveryFallbackMessage() };
  }

  console.info("[rental-interest] zugestellt", {
    contactType: replyTo ? "email" : "phone-or-other",
  });

  return { ok: true };
}
