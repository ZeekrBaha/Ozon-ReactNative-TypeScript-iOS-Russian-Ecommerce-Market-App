import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {Icon} from './Icon';

// 1→отзыв, 2–4→отзыва, else→отзывов; teen exception 11–14→отзывов.
export function reviewWord(n: number): string {
  if (n % 100 >= 11 && n % 100 <= 14) {
    return 'отзывов';
  }
  switch (n % 10) {
    case 1:
      return 'отзыв';
    case 2:
    case 3:
    case 4:
      return 'отзыва';
    default:
      return 'отзывов';
  }
}

// ★ rating + ru-pluralized review count (design.md §3.4).
export const RatingRow: React.FC<{rating: number; reviewCount: number}> = ({
  rating,
  reviewCount,
}) => (
  <View style={styles.row}>
    <Icon name="star" size={13} color={colors.ratingStar} />
    <Text style={styles.rating}>{rating.toFixed(1)}</Text>
    <Icon name="chatbubble-outline" size={13} color={colors.textSecondary} />
    <Text style={[typography.secondary, {color: colors.textSecondary}]}>
      {reviewCount} {reviewWord(reviewCount)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center', gap: 4},
  rating: {fontSize: 13, fontWeight: '700', color: colors.textPrimary},
});
