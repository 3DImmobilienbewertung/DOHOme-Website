"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import {
  submitRentalInterest,
  type RentalField,
  type RentalState,
} from "@/app/actions/rental";

const INITIAL: RentalState = { ok: false };

export function RentalInterestForm() {
  const [state, formAction] = useActionState(submitRentalInterest, INITIAL);
  const [timestamp] = useState(() => Date.now());
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.ok) successRef.current?.focus();
  }, [state.ok]);

  useEffect(() => {
    const firstError = state.fieldErrors && Object.keys(state.fieldErrors)[0];
    if (firstError) document.getElementById(firstError)?.focus();
  }, [state]);

  if (state.ok) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-sage-300/40 bg-sage-300/10 p-8 text-center outline-none"
      >
        <p className="font-display text-3xl">Suchprofil ist eingegangen.</p>
        <p className="mt-3 text-beige-100/75">
          Sobald eine passende Wohnung verfügbar ist, können wir Sie gezielt
          kontaktieren. Rückfragen beantworten wir werktags in der Regel
          innerhalb von 24 Stunden.
        </p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} noValidate>
      <input type="hidden" name="ts" value={timestamp} />
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
      >
        <label htmlFor="leave_blank">Dieses Feld bitte leer lassen</label>
        <input id="leave_blank" name="leave_blank" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <RentalFieldInput
          name="name"
          label="Name *"
          autoComplete="name"
          required
          error={errors.name}
        />
        <RentalFieldInput
          name="email"
          label="E-Mail *"
          type="email"
          autoComplete="email"
          required
          error={errors.email}
        />
        <RentalFieldInput
          name="phone"
          label="Telefon"
          type="tel"
          autoComplete="tel"
          error={errors.phone}
        />
        <RentalSelect
          name="rooms"
          label="Wunschgröße *"
          error={errors.rooms}
          options={[
            ["", "Bitte auswählen"],
            ["2 Zimmer", "2 Zimmer"],
            ["2,5 Zimmer", "2,5 Zimmer"],
            ["3 Zimmer", "3 Zimmer"],
            ["3,5 Zimmer oder größer", "3,5 Zimmer oder größer"],
            ["Flexibel", "Flexibel"],
          ]}
        />
        <RentalFieldInput
          name="household_size"
          label="Personen im Haushalt"
          inputMode="numeric"
          error={errors.household_size}
        />
        <RentalFieldInput
          name="move_in"
          label="Gewünschter Einzug"
          placeholder="z. B. ab Oktober oder flexibel"
          error={errors.move_in}
        />
        <div className="sm:col-span-2">
          <RentalFieldInput
            name="max_rent"
            label="Maximale Kaltmiete pro Monat"
            inputMode="numeric"
            placeholder="z. B. 1.100 €"
            error={errors.max_rent}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="block text-sm text-beige-100/80">
          Weitere Wünsche
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Erdgeschoss, Balkon, Stellplatz, Haustier …"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-2 w-full rounded-xl border border-beige-100/45 bg-green-900/40 px-4 py-3 text-beige-100 placeholder:text-beige-100/50 focus:border-beige-100/70"
        />
        {errors.message && <FieldError id="message-error" message={errors.message} />}
      </div>

      {state.error && (
        <p className="mt-4 text-sm text-danger-300" role="alert">
          {state.error}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-5">
        <RentalSubmitButton />
        <p className="max-w-sm text-xs leading-relaxed text-beige-100/60">
          Wir verwenden Ihre Angaben ausschließlich zur Bearbeitung Ihres
          Suchprofils. Details in unserer{" "}
          <Link href="/datenschutz" className="underline underline-offset-2">
            Datenschutzerklärung
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

type InputProps = {
  name: RentalField;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "numeric" | "tel" | "email" | "text";
  placeholder?: string;
  error?: string;
};

function RentalFieldInput({
  name,
  label,
  type = "text",
  required,
  autoComplete,
  inputMode,
  placeholder,
  error,
}: InputProps) {
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
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className="mt-2 w-full rounded-xl border border-beige-100/45 bg-green-900/40 px-4 py-3 text-beige-100 placeholder:text-beige-100/50 focus:border-beige-100/70"
      />
      {error && <FieldError id={`${name}-error`} message={error} />}
    </div>
  );
}

function RentalSelect({
  name,
  label,
  options,
  error,
}: {
  name: RentalField;
  label: string;
  options: readonly (readonly [string, string])[];
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-beige-100/80">
        {label}
      </label>
      <select
        id={name}
        name={name}
        required
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className="mt-2 w-full rounded-xl border border-beige-100/45 bg-green-900 px-4 py-3 text-beige-100 focus:border-beige-100/70"
      >
        {options.map(([value, text]) => (
          <option key={text} value={value}>
            {text}
          </option>
        ))}
      </select>
      {error && <FieldError id={`${name}-error`} message={error} />}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-danger-300" role="alert">
      {message}
    </p>
  );
}

function RentalSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-accent-500 px-8 py-4 text-sm font-medium text-green-950 transition-colors hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Wird gesendet …" : "Suchprofil senden"}
    </button>
  );
}
