import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {Category} from '../models/types';
import {colors} from '../theme/colors';
import {ProductImage} from './ProductImage';

// Category tile (design.md §3.6). Label top-left; transparent cutout bottom-right.
export const CategoryCard: React.FC<{category: Category}> = ({category}) => (
  <View style={styles.card} testID="categoryCard" accessibilityLabel={category.title}>
    <Text numberOfLines={2} style={styles.label}>
      {category.title}
    </Text>
    <ProductImage name={category.imageName} resizeMode="contain" style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  card: {
    height: 188,
    backgroundColor: colors.searchFill,
    borderRadius: 16,
    overflow: 'hidden',
  },
  label: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  image: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: '62%',
    height: 116,
  },
});
