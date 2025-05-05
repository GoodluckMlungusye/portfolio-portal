import { useQuery } from '@tanstack/react-query';
import React, {useMemo, ReactNode , useContext, createContext } from 'react';

import { getData } from 'src/services/getService';

interface DataContextType {
  data: any[];
  loading: boolean;
  errorMessage: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
  endpoint: string;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children, endpoint }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${endpoint}`],
    queryFn: () => getData(`/${endpoint}`),
  });

  const contextValue = useMemo(() => ({
    data: data || [],
    loading: isLoading,
    errorMessage: error?.message || null,
  }), [data, isLoading, error]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};