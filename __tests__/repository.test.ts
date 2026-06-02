/**
 * Repository (Model boundary) unit tests.
 * @format
 */
import {SampleDataRepository} from '../src/services/ProductRepository';

const repo = new SampleDataRepository();

describe('SampleDataRepository', () => {
  it('serves the expected collection sizes', () => {
    expect(repo.categories()).toHaveLength(18);
    expect(repo.quickActions()).toHaveLength(6);
    expect(repo.settings()).toHaveLength(5);
    expect(repo.banners()).toHaveLength(4);
    expect(repo.recommendedProducts().length).toBeGreaterThanOrEqual(6);
    expect(repo.viewedProducts()).toHaveLength(4);
  });

  it('exposes the featured favorite', () => {
    expect(repo.featuredFavorite().id).toBe('watch');
    expect(repo.featuredFavorite().isFavorite).toBe(true);
  });

  it('finds a product by id and returns undefined for unknown ids', () => {
    expect(repo.productById('watch')?.id).toBe('watch');
    expect(repo.productById('does-not-exist')).toBeUndefined();
  });

  it('keeps categories in the exact spec order', () => {
    const titles = repo.categories().map(c => c.title);
    expect(titles[0]).toBe('Женская одежда');
    expect(titles[5]).toBe('Электроника');
    expect(titles[titles.length - 1]).toBe('Книги');
  });
});
