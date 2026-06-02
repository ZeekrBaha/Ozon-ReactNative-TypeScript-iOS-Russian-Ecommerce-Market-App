import {useRepository} from '../services/RepositoryContext';

// Screen 4 state — empty cart + "viewed" grid.
export function useCartViewModel() {
  const repo = useRepository();
  return {
    viewed: repo.viewedProducts(),
    isEmpty: true,
    city: 'Астана',
  };
}
