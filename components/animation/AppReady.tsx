"use client";

import { createContext, useCallback, useContext, useState } from "react";

type AppReadyValue = { ready: boolean; setReady: () => void };

const Ctx = createContext<AppReadyValue>({ ready: true, setReady: () => {} });

export function AppReadyProvider({ children }: { children: React.ReactNode }) {
  // Die Inhaltsanimation darf sofort anlaufen und liegt während des kurzen
  // Logo-Intros bereits hinter dem Vorhang. So öffnet der Vorhang auf eine
  // fertige Bühne und blockiert nicht den Largest Contentful Paint.
  const [ready, set] = useState(true);
  const setReady = useCallback(() => set(true), []);
  return <Ctx.Provider value={{ ready, setReady }}>{children}</Ctx.Provider>;
}

export const useAppReady = () => useContext(Ctx);
