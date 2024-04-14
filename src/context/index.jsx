"use client";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(undefined);

export function AppWrapper({ children }) {
  const [menu, setMenu] = useState(null);

  return (
    <AppContext.Provider value={{ menu, setMenu }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
