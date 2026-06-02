import React from 'react';
import {View, StyleSheet} from 'react-native';
import type {Product} from '../models/types';
import {layout} from '../theme/spacing';
import {ProductCard, ProductCardVariant} from './ProductCard';

// 2-column wrap grid of the keystone ProductCard. cardWidth is computed by the screen.
export const ProductGrid: React.FC<{
  products: Product[];
  cardWidth: number;
  onSelect: (p: Product) => void;
  variant?: ProductCardVariant;
}> = ({products, cardWidth, onSelect, variant = 'grid'}) => (
  <View style={styles.grid}>
    {products.map(p => (
      <View key={p.id} style={{width: cardWidth}}>
        <ProductCard product={p} variant={variant} onPress={() => onSelect(p)} />
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {flexDirection: 'row', flexWrap: 'wrap', gap: layout.gridSpacing},
});
