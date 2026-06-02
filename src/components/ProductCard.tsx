import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import type {Product} from '../models/types';
import {colors} from '../theme/colors';
import {layout} from '../theme/spacing';
import {typography} from '../theme/typography';
import {ProductImage} from './ProductImage';
import {PriceBlock} from './PriceBlock';
import {RatingRow} from './RatingRow';
import {CTAButton} from './Buttons';
import {Icon} from './Icon';

export type ProductCardVariant = 'grid' | 'featuredCompact' | 'viewedGrid';

// The keystone card (design.md §3.2, red-line #7). One component renders every
// product surface; the screen decides outer width per variant. The whole card is a
// Pressable (testID="productCard") that fires onPress → navigation.
export const ProductCard: React.FC<{
  product: Product;
  variant?: ProductCardVariant;
  onPress?: () => void;
}> = ({product, onPress}) => {
  const dots = Math.min(product.imageCount, 8);
  return (
    <Pressable
      testID="productCard"
      accessibilityRole="button"
      accessibilityLabel={product.title}
      onPress={onPress}
      style={styles.card}>
      <View style={styles.imageWrap}>
        <ProductImage name={product.imageName} style={styles.image} />

        <View style={[styles.heart, product.isFavorite && styles.heartFav]}>
          <Icon
            name={product.isFavorite ? 'heart' : 'heart-outline'}
            size={18}
            color={product.isFavorite ? colors.priceSale : '#FFFFFF'}
          />
        </View>

        {product.badge === 'salesOfWeek' && (
          <View style={styles.badge}>
            <Icon name="flame" size={10} color="#FFFFFF" />
            <Text style={[typography.badge, {color: '#FFFFFF'}]}>СКИДКИ НЕДЕЛИ</Text>
          </View>
        )}

        {product.imageCount > 1 && (
          <View style={styles.dots}>
            {Array.from({length: dots}).map((_, i) => (
              <View
                key={i}
                style={[styles.dot, {backgroundColor: i === 0 ? colors.brandPrimary : 'rgba(255,255,255,0.7)'}]}
              />
            ))}
          </View>
        )}
      </View>

      <PriceBlock product={product} />
      <Text numberOfLines={2} style={[typography.cardTitle, styles.title]}>
        {product.title}
      </Text>
      <RatingRow rating={product.rating} reviewCount={product.reviewCount} />
      <CTAButton date={product.deliveryDate} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceCard,
    borderRadius: layout.cornerCard,
    padding: 10,
    gap: 8,
    overflow: 'hidden',
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: layout.cornerImage,
    overflow: 'hidden',
    backgroundColor: colors.searchFill,
  },
  image: {width: '100%', height: '100%'},
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartFav: {backgroundColor: 'transparent'},
  badge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.priceSale,
    borderRadius: 11,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  dots: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  dot: {width: 5, height: 5, borderRadius: 2.5},
  title: {color: colors.textPrimary, minHeight: 36},
});
