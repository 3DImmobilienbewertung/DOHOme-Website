"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitCallback, type CallbackState } from "@/app/actions/callback";
import { trackEvent } from "@/lib/analytics";

const INITIAL: CallbackState = { ok: false };

// Minimales Rückruf-Formular für Landingpages: Name + Telefon (+ optionale
// Frage). Feldbezogene Fehler, Fokus-Management, Honeypot + Zeitfalle im Server.
export function CallbackForm({
  source = "landingpage",
  className,
}: {
  source?: string;
  className?: string;
}) {
  const [state, action] = useActionState(submitCallback, INITIAL);
  const [ts] = useState(() => Date.now());
  const okRef = useRef<HTMLDivElement>(null);
  const trackedSuccess = useRef(false);

  useEffect(() => {
    if (!state.ok) return;
    okRef.current?.focus();
    if (!trackedSuccess.current) {
      trackedSuccess.current = true;
      trackEvent("generate_lead", { lead_type: "rueckruf", source });
    }
  }, [source, state.ok]);
  useEffect(() => {
    const first = state.fieldErrors && Object.keys(state.fieldErrors)[0];
    if (first) document.getElementById(`cb-${first}`)?.focus();
  }, [state]);

  if (state.ok) {
    return (
      <div className={className}>
        <div
          ref={okRef}
          tabIndex={-1}
          role="status"
          className="rounded-2xl border border-sage-300/40 bg-sage-300/10 p-6 text-center outline-none"
        >
          <p className="font-display text-xl">Danke!</p>
          <p className="mt-2 text-sm text-beige-100/80">
            Wir rufen Sie zeitnah zurück.
          </p>
        </div>
      </div>
    );
  }

  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className={className} noValidate>
      <input type="hidden" name="ts" value={ts} />
      <input type="hidden" name="source" value={source} />
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="cb-leave_blank">Dieses Feld bitte leer lassen</label>
        <input id="cb-leave_blank" name="leave_blank" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="cb-name" name="name" label="Name *" autoComplete="name" error={fe.name} />
        <Field
          id="cb-phone"
          name="phone"
          label="Telefon *"
          type="tel"
          autoComplete="tel"
          error={fe.phone}
        />
      </div>

      {state.error && (
        <p className="mt-3 text-sm text-danger-300" role="alert">
          {state.error}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <SubmitButton />
        <p className="max-w-xs text-xs text-beige-100/70">
          Vertraulich verarbeitet gemäß unserer{" "}
          <Link href="/datenschutz" className="underline underline-offset-2 hover:text-beige-100">
            Datenschutzerklärung
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-beige-100/80">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 w-full rounded-xl border border-beige-100/45 bg-green-900/40 px-4 py-3 text-beige-100 transition-colors placeholder:text-beige-100/60 focus:border-beige-100/70"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-accent-500 px-7 py-3.5 text-sm font-semibold text-green-950 transition-colors hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Wird gesendet …" : "Rückruf anfordern"}
    </button>
  );
}
