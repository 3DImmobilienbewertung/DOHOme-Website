"use client";

import { createContext, useCallback, useContext, useState } from "react";

type AppReadyValue = { ready: boolean; setReady: () => void };

const Ctx = createContext<AppReadyValue>({ ready: false, setReady: () => {} });

export function AppReadyProvider({ children }: { children: React.ReactNode }) {
  const [ready, set] = useState(false);
  const setReady = useCallback(() => set(true), []);
  return <Ctx.Provider value={{ ready, setReady }}>{children}</Ctx.Provider>;
}

export const useAppReady = () => useContext(Ctx);
