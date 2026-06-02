import {useRepository} from '../services/RepositoryContext';

// Screen 5 state — settings rows + recommended grid.
export function useProfileViewModel() {
  const repo = useRepository();
  return {
    settings: repo.settings(),
    recommended: repo.recommendedProducts(),
  };
}
