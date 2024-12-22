import React, { useMemo, useState, ReactNode, useContext , useCallback, createContext } from 'react';

import { RowObject } from 'src/models/api';

interface RowContextType {
  row: RowObject | null;
  updateRow: (newRow: RowObject) => void;
}

const RowContext = createContext<RowContextType | undefined>(undefined);

interface RowProviderProps {
  children: ReactNode;
}

export const RowProvider: React.FC<RowProviderProps> = ({ children }) => {
  const [row, setRow] = useState<RowObject | null>(null);

  const updateRow = useCallback((newRow: RowObject) => {
    setRow(newRow);
  }, []);

    const contextValue = useMemo(() => ({
      row,
      updateRow,
    }), [row, updateRow]);

  return (
    <RowContext.Provider value={contextValue}>
      {children}
    </RowContext.Provider>
  );
};

export const useRowContext = () => {
  const context = useContext(RowContext);
  if (!context) {
    throw new Error('useRowContext must be used within a RowProvider');
  }
  return context;
};
