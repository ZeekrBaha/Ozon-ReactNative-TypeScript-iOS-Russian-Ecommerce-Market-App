import React, {createContext, useContext} from 'react';
import {ProductRepository, SampleDataRepository} from './ProductRepository';

// DI seam: the concrete repository is provided once at the root and consumed by
// ViewModel hooks via useRepository().
const RepositoryContext = createContext<ProductRepository>(new SampleDataRepository());

export const RepositoryProvider: React.FC<{
  repository?: ProductRepository;
  children: React.ReactNode;
}> = ({repository, children}) => (
  <RepositoryContext.Provider value={repository ?? new SampleDataRepository()}>
    {children}
  </RepositoryContext.Provider>
);

export const useRepository = (): ProductRepository => useContext(RepositoryContext);
