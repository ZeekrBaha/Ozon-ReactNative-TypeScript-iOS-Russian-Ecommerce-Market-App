import {useRepository} from '../services/RepositoryContext';

// Screen 2 state — the category grid.
export function useCatalogViewModel() {
  const repo = useRepository();
  return {categories: repo.categories()};
}
