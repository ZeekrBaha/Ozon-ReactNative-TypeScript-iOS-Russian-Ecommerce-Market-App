import type {Product, Category, QuickAction, SettingsItem, Banner} from '../models/types';
import {sampleData} from '../models/sampleData';

// Data-access seam (MVVM-C "Model" boundary). Hooks depend on this interface, never
// on `sampleData` directly — so the mock source can be swapped for a network/DB layer.
export interface ProductRepository {
  banners(): Banner[];
  quickActions(): QuickAction[];
  recommendedProducts(): Product[];
  viewedProducts(): Product[];
  featuredFavorite(): Product;
  categories(): Category[];
  settings(): SettingsItem[];
  productById(id: string): Product | undefined;
}

export class SampleDataRepository implements ProductRepository {
  banners() {
    return sampleData.banners;
  }
  quickActions() {
    return sampleData.quickActions;
  }
  recommendedProducts() {
    return sampleData.recommended;
  }
  viewedProducts() {
    return sampleData.viewed;
  }
  featuredFavorite() {
    return sampleData.featuredFavorite;
  }
  categories() {
    return sampleData.categories;
  }
  settings() {
    return sampleData.settings;
  }
  productById(id: string) {
    return sampleData.products.find(p => p.id === id);
  }
}
