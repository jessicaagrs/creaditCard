'use client';
import { TabUi } from '@/enum/enums';
import { createContext, useMemo, useState } from 'react';

export const CreditCardContext = createContext({
  tab: TabUi.MAIN,
  setTab: (tab: TabUi) => {},
});

CreditCardContext.displayName = 'CreditCardContext';

interface ProviderProps {
  readonly children: React.ReactNode;
}

export function CreditCardContextProvider({ children }: ProviderProps) {
  const [tab, setTab] = useState<TabUi>(TabUi.MAIN);

  const contextValue = useMemo(
    () => ({
      tab,
      setTab,
    }),
    [tab]
  );

  return (
    <CreditCardContext.Provider value={contextValue}>
      {children}
    </CreditCardContext.Provider>
  );
}
