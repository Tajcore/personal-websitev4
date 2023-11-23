"use client"

import { createContext, useState, Dispatch, SetStateAction } from 'react';

interface ActiveSectionState {
  id: string;
  percentage: number;
}

interface ActiveSectionContextProps {
  activeSection: ActiveSectionState | null;
  setActiveSection: Dispatch<SetStateAction<ActiveSectionState | null>>;
}

export const ActiveSectionContext = createContext<ActiveSectionContextProps>({
  activeSection: null,
  setActiveSection: () => {},
});

export const ActiveSectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<ActiveSectionState | null>(null);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};
