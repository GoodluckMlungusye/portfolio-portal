import { useQuery } from '@tanstack/react-query';
import React, {useMemo, ReactNode , useContext, createContext } from 'react';

import { endpoints } from 'src/utils/endpoint';

import { getData } from 'src/services/getService';

interface DataContextType {
  dataProvided: any[];
  loading: boolean;
  errorMessage: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['link'],
    queryFn: () => getData(endpoints.link.get),
  });

  const contextValue = useMemo(() => ({
    dataProvided: data || [],
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