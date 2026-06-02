export type ProductBadge = 'salesOfWeek'; // flame + "СКИДКИ НЕДЕЛИ"

export interface Product {
  id: string;
  imageName: string; // asset key; §3.0 fallback if absent
  imageCount: number; // page dots (1 = no dots)
  isFavorite: boolean;
  badge: ProductBadge | null;
  installmentPrice: string; // "1398 ₸"
  installmentTerm: string; // "×12 мес"
  salePrice: string; // "16 769 ₸"
  oldPrice: string | null; // "154 967 ₸" (strikethrough)
  discountPercent: number | null; // 89 → "-89%"
  urgency: string | null; // "218 шт осталось"
  title: string;
  rating: number; // 4.7
  reviewCount: number; // 6
  deliveryDate: string; // "6 июня"
}

export interface Category {
  id: string;
  title: string;
  imageName: string;
}

export interface QuickAction {
  id: string;
  title: string;
  imageName: string;
}

export interface SettingsItem {
  id: string;
  title: string;
  value: string | null;
}

export interface Banner {
  id: string;
  imageName: string;
}
