import {useCallback, useEffect, useState} from 'react';
import {useRepository} from '../services/RepositoryContext';

// Screen 1 state. Owns the carousel index + 3s auto-advance. No JSX.
export function useHomeViewModel() {
  const repo = useRepository();
  const banners = repo.banners();
  const quickActions = repo.quickActions();
  const recommended = repo.recommendedProducts();

  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) {
      return;
    }
    const timer = setInterval(() => {
      setBannerIndex(i => (i + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // Keep state in sync when the user swipes the carousel by hand.
  const syncBannerIndex = useCallback((index: number) => {
    setBannerIndex(index);
  }, []);

  return {banners, quickActions, recommended, bannerIndex, syncBannerIndex};
}
