import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

// Modulares CTA-Primitive der Designsystem-Bibliothek.
// - primary   → 10 %-Kupfer-Akzent (accent-500) mit green-950-Text, 4,8:1 (AA).
//               Reserviert für den einen Primär-CTA je Seite.
// - secondary → Kontur auf dunklen Flächen (Border-Kontrast /45 = 3,4:1, AA UI).
// - ghost     → dezenter Textlink mit Unterstreichung on hover.
// Fokus-Sichtbarkeit liefert die globale focus-visible-Signatur (globals.css).

export type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center rounded-full text-sm font-medium " +
  "transition-[transform,background-color,color] duration-300 ease-out-expo " +
  "disabled:pointer-events-none disabled:opacity-60";

const sizes = "px-7 py-3.5";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-500 text-green-950 hover:bg-accent-400 hover:-translate-y-0.5",
  secondary:
    "border border-beige-100/45 text-beige-100 hover:bg-beige-100/10",
  ghost: "text-beige-100 underline-offset-4 hover:underline",
};

function classes(variant: ButtonVariant, className?: string) {
  return [base, sizes, variants[variant], className].filter(Boolean).join(" ");
}

type SharedProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = SharedProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

type ButtonAsButton = SharedProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, "className">;

/** Rendert einen Next-Link, wenn `href` gesetzt ist, sonst ein <button>. */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  if (props.href !== undefined) {
    const {
      href,
      variant = "primary",
      className,
      children,
      ...rest
    } = props;
    return (
      <Link href={href} className={classes(variant, className)} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    variant = "primary",
    className,
    children,
    ...rest
  } = props;
  return (
    <button className={classes(variant, className)} {...rest}>
      {children}
    </button>
  );
}
