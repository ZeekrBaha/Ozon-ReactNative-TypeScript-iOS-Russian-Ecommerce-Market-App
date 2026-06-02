import {colors} from './colors';

// All OZON identity isolated here (design-system.md §7, red-line #8). Screens read
// `brand`, never the literal "OZON" string or brand hex.
export const brand = {
  wordmark: 'OZON',
  pillColor: colors.surfaceCard, // white pill
  wordmarkColor: colors.brandPrimary, // blue wordmark
  // Blue gradient used by the Home header + the Profile avatar.
  gradientTop: '#2189FF',
  gradientBottom: '#005BFF',
} as const;
