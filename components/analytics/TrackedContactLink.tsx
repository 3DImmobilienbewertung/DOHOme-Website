"use client";

import type { ReactNode } from "react";

import { trackEvent } from "@/lib/analytics";

type TrackedContactLinkProps = {
  href: string;
  method: "email" | "phone";
  placement: string;
  className?: string;
  children: ReactNode;
};

export function TrackedContactLink({
  href,
  method,
  placement,
  className,
  children,
}: TrackedContactLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEvent("contact_click", { method, placement })}
    >
      {children}
    </a>
  );
}
