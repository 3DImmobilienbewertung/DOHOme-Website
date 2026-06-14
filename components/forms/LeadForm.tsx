"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead, type LeadState } from "@/app/actions/lead";

const INITIAL: LeadState = { ok: false };

type LeadFormProps = {
  /** Wird als verstecktes Feld mitgesendet – ordnet die Anfrage später zu. */
  subject: string;
  submitLabel: string;
  /** Zusätzliche Grundstücks-Felder (für /grundstueck-anbieten). */
  withPlotFields?: boolean;
  className?: string;
};

export function LeadForm({
  subject,
  submitLabel,
  withPlotFields = false,
  className,
}: LeadFormProps) {
  const [state, formAction] = useActionState(submitLead, INITIAL);

  if (state.ok) {
    return (
      <div className={className}>
        <div className="rounded-2xl border border-sage-300/40 bg-sage-300/10 p-8 text-center">
          <p className="font-display text-2xl">Vielen Dank!</p>
          <p className="mt-2 text-beige-100/75">
            Ihre Nachricht ist bei uns eingegangen. Wir melden uns werktags
            innerhalb von 24&nbsp;Stunden bei Ihnen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className={className} noValidate>
      <input type="hidden" name="subject" value={subject} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Name *" autoComplete="name" required />
        <Field
          name="email"
          label="E-Mail *"
          type="email"
          autoComplete="email"
          required
        />
        <Field name="phone" label="Telefon" type="tel" autoComplete="tel" />
        {withPlotFields ? (
          <Field
            name="plot_size"
            label="Grundstücksgröße (ca. m²)"
            inputMode="numeric"
          />
        ) : (
          <Field name="topic" label="Betreff" />
        )}
        {withPlotFields && (
          <div className="sm:col-span-2">
            <Field
              name="plot_address"
              label="Adresse / Lage des Grundstücks"
              autoComplete="street-address"
            />
          </div>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="block text-sm text-beige-100/70">
          {withPlotFields ? "Weitere Angaben" : "Ihre Nachricht *"}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required={!withPlotFields}
          placeholder={
            withPlotFields
              ? "Bebauung, Zeithorizont, Besonderheiten …"
              : "Wie können wir Ihnen helfen?"
          }
          className="mt-2 w-full rounded-xl border border-beige-100/20 bg-green-900/40 px-4 py-3 text-beige-100 outline-none transition-colors placeholder:text-beige-100/30 focus:border-beige-100/50"
        />
      </div>

      {state.error && (
        <p className="mt-4 text-sm text-[#E6B8A2]" role="alert">
          {state.error}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <SubmitButton label={submitLabel} />
        <p className="max-w-xs text-xs text-beige-100/50">
          Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur
          Bearbeitung Ihrer Anfrage zu.
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "numeric" | "tel" | "email" | "text";
};

function Field({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-beige-100/70">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="mt-2 w-full rounded-xl border border-beige-100/20 bg-green-900/40 px-4 py-3 text-beige-100 outline-none transition-colors placeholder:text-beige-100/30 focus:border-beige-100/50"
      />
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-beige-100 px-8 py-4 text-sm font-medium text-ink transition-colors hover:bg-beige-200 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Wird gesendet …" : label}
    </button>
  );
}
