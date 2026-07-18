"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead, type LeadState } from "@/app/actions/lead";

const INITIAL: LeadState = { ok: false };

type LeadFormProps = {
  /** Wird als verstecktes Feld mitgesendet – ordnet die Anfrage später zu. */
  subject: string;
  submitLabel: string;
  /** Zusätzliche Grundstücks-Felder (für /grundstueck-verkaufen). */
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
  // Zeitstempel beim Aufbau – Grundlage der serverseitigen Zeitfalle gegen Bots.
  const [ts] = useState(() => Date.now());
  const successRef = useRef<HTMLDivElement>(null);

  // Erfolg: Fokus auf die Bestätigung (Ansage via role="status").
  useEffect(() => {
    if (state.ok) successRef.current?.focus();
  }, [state.ok]);

  // Fehler: Fokus auf das erste beanstandete Feld.
  useEffect(() => {
    const first = state.fieldErrors && Object.keys(state.fieldErrors)[0];
    if (first) document.getElementById(first)?.focus();
  }, [state]);

  if (state.ok) {
    return (
      <div className={className}>
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="rounded-2xl border border-sage-300/40 bg-sage-300/10 p-8 text-center outline-none"
        >
          <p className="font-display text-2xl">Vielen Dank!</p>
          <p className="mt-2 text-beige-100/80">
            Ihre Nachricht ist bei uns eingegangen. Wir melden uns werktags
            innerhalb von 24&nbsp;Stunden bei Ihnen.
          </p>
          <Link
            href="/projekte"
            className="mt-6 inline-block text-sm text-accent-400 underline underline-offset-4 hover:text-accent-500"
          >
            In der Zwischenzeit: Projekte entdecken
          </Link>
        </div>
      </div>
    );
  }

  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className={className} noValidate>
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="ts" value={ts} />

      {/* Honeypot: für Menschen unsichtbar, von Bots ausgefüllt. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="leave_blank">Dieses Feld bitte leer lassen</label>
        <input id="leave_blank" name="leave_blank" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Name *" autoComplete="name" required error={fieldErrors.name} />
        <Field
          name="email"
          label="E-Mail *"
          type="email"
          autoComplete="email"
          required
          error={fieldErrors.email}
        />
        <Field name="phone" label="Telefon" type="tel" autoComplete="tel" error={fieldErrors.phone} />
        {withPlotFields ? (
          <Field
            name="plot_size"
            label="Grundstücksgröße (ca. m²)"
            inputMode="numeric"
            error={fieldErrors.plot_size}
          />
        ) : (
          <Field name="topic" label="Betreff" error={fieldErrors.topic} />
        )}
        {withPlotFields && (
          <div className="sm:col-span-2">
            <Field
              name="plot_address"
              label="Adresse / Lage des Grundstücks"
              autoComplete="street-address"
              error={fieldErrors.plot_address}
            />
          </div>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="block text-sm text-beige-100/80">
          {withPlotFields ? "Weitere Angaben" : "Ihre Nachricht *"}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          placeholder={
            withPlotFields
              ? "Bebauung, Zeithorizont, Besonderheiten …"
              : "Wie können wir Ihnen helfen?"
          }
          className="mt-2 w-full rounded-xl border border-beige-100/45 bg-green-900/40 px-4 py-3 text-beige-100 transition-colors placeholder:text-beige-100/60 focus:border-beige-100/70"
        />
        {fieldErrors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-danger-300" role="alert">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {state.error && (
        <p className="mt-4 text-sm text-danger-300" role="alert">
          {state.error}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <SubmitButton label={submitLabel} />
        <p className="max-w-xs text-sm text-beige-100/70">
          Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur
          Bearbeitung Ihrer Anfrage zu. Details in unserer{" "}
          <Link
            href="/datenschutz"
            className="underline underline-offset-2 hover:text-beige-100"
          >
            Datenschutzerklärung
          </Link>
          .
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
  error?: string;
};

function Field({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
  error,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-beige-100/80">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className="mt-2 w-full rounded-xl border border-beige-100/45 bg-green-900/40 px-4 py-3 text-beige-100 transition-colors placeholder:text-beige-100/60 focus:border-beige-100/70"
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-danger-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-accent-500 px-8 py-4 text-sm font-medium text-green-950 transition-colors hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Wird gesendet …" : label}
    </button>
  );
}
