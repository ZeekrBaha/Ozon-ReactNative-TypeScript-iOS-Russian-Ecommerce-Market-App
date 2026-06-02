import type {TextStyle} from 'react-native';

// Type styles (design-system.md §3). RN TextStyle objects.
export const typography: Record<string, TextStyle> = {
  screenTitle: {fontSize: 30, fontWeight: '700'},
  sectionTitle: {fontSize: 28, fontWeight: '700'},
  priceMain: {fontSize: 16, fontWeight: '700'},
  installment: {fontSize: 15, fontWeight: '600'},
  cardTitle: {fontSize: 14, fontWeight: '400'},
  body: {fontSize: 15, fontWeight: '400'},
  secondary: {fontSize: 13, fontWeight: '400'},
  badge: {fontSize: 11, fontWeight: '700'},
  cta: {fontSize: 15, fontWeight: '600'},
  tabLabel: {fontSize: 11, fontWeight: '400'},
};
