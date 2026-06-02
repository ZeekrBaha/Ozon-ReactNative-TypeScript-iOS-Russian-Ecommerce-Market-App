import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {Product} from '../models/types';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';

// Price lines (design.md §3.3): installment / sale(+old+discount) / urgency.
export const PriceBlock: React.FC<{product: Product}> = ({product}) => (
  <View style={styles.block}>
    <Text style={[typography.installment, {color: colors.priceInstallment}]}>
      {product.installmentPrice} {product.installmentTerm}
    </Text>

    <View style={styles.saleRow}>
      <Text style={[typography.priceMain, {color: colors.priceSale}]}>{product.salePrice}</Text>
      {product.oldPrice != null && (
        <Text style={[typography.secondary, styles.oldPrice]}>{product.oldPrice}</Text>
      )}
      {product.discountPercent != null && (
        <Text style={[typography.secondary, {color: colors.priceSale}]}>
          -{product.discountPercent}%
        </Text>
      )}
    </View>

    {product.urgency != null && (
      <Text style={[typography.secondary, {color: colors.priceSale}]}>{product.urgency}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  block: {gap: 3},
  saleRow: {flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap'},
  oldPrice: {color: colors.textSecondary, textDecorationLine: 'line-through'},
});
