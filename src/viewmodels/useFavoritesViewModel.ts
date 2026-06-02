import {useRepository} from '../services/RepositoryContext';

// Screen 3 state — featured favorite + recommended grid.
export function useFavoritesViewModel() {
  const repo = useRepository();
  return {
    featured: repo.featuredFavorite(),
    recommended: repo.recommendedProducts(),
  };
}
