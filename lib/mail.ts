import { site } from "@/lib/content/site";

// Zustellung der Formularanfragen per E-Mail (Resend).
//
// Bewusst ohne SDK-Abhängigkeit: die REST-Schnittstelle genügt und hält das
// Bundle klein.
//
// WICHTIG: Ist kein Schlüssel gesetzt, meldet diese Datei das ehrlich zurück –
// die Actions dürfen dem Absender dann KEINEN Erfolg vortäuschen. Ein
// stillschweigend verlorener Lead ist der teuerste Fehler dieser Website.
//
// Benötigte Umgebungsvariablen:
//   RESEND_API_KEY    – API-Schlüssel von resend.com
//   LEAD_NOTIFY_TO    – Empfängeradresse (Default: site.contact.email)
//   LEAD_NOTIFY_FROM  – Absender, muss eine bei Resend verifizierte Domain sein
//                       (z. B. "DOHOme Website <website@dohome.de>")

export function isMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_FROM);
}

export type Notification = {
  subject: string;
  /** Zeilen als [Bezeichnung, Wert] – leere Werte werden ausgelassen. */
  fields: [string, string | undefined | null][];
  /** Adresse des Interessenten, damit „Antworten“ direkt funktioniert. */
  replyTo?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Versendet die Benachrichtigung. Wirft nicht – der Aufrufer entscheidet
 * anhand des Rückgabewerts, was der Absender zu sehen bekommt.
 */
export async function sendNotification(
  n: Notification,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (!isMailConfigured()) {
    return { ok: false, reason: "not-configured" };
  }

  const rows = n.fields
    .filter(([, v]) => v != null && String(v).trim().length > 0)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;vertical-align:top;color:#555">${escapeHtml(k)}</td>` +
        `<td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(String(v))}</td></tr>`,
    )
    .join("");

  const text = n.fields
    .filter(([, v]) => v != null && String(v).trim().length > 0)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.LEAD_NOTIFY_FROM,
        to: [process.env.LEAD_NOTIFY_TO || site.contact.email],
        subject: n.subject,
        text,
        html: `<table style="font-family:system-ui,sans-serif;font-size:15px;border-collapse:collapse">${rows}</table>`,
        ...(n.replyTo ? { reply_to: n.replyTo } : {}),
      }),
      // Ein hängender Mailversand darf die Formularantwort nicht blockieren.
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      // Statuscode reicht zur Diagnose – Inhalt könnte PII enthalten.
      return { ok: false, reason: `resend-${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      reason: err instanceof Error ? err.name : "unknown",
    };
  }
}

/** Ehrlicher Ausweichtext, wenn die Zustellung nicht möglich war. */
export function deliveryFallbackMessage(): string {
  const phone = site.contact.phone ? ` oder telefonisch unter ${site.contact.phone}` : "";
  return (
    "Ihre Anfrage konnte gerade nicht übermittelt werden. " +
    `Bitte erreichen Sie uns direkt per E-Mail an ${site.contact.email}${phone}.`
  );
}
