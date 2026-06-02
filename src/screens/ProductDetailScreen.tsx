import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useRepository} from '../services/RepositoryContext';
import {ProductImage} from '../components/ProductImage';
import {PriceBlock} from '../components/PriceBlock';
import {RatingRow} from '../components/RatingRow';
import {CTAButton} from '../components/Buttons';
import {colors} from '../theme/colors';
import {layout} from '../theme/spacing';
import {typography} from '../theme/typography';
import type {TabStackParamList} from '../navigation/routes';

// Pushed destination for ProductDetail. Re-reads the product from the repository by
// id (serializable param) and reuses the product components.
export const ProductDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<TabStackParamList, 'ProductDetail'>>();
  const repo = useRepository();
  const product = repo.productById(route.params.productId);

  if (!product) {
    return <View style={styles.screen} />;
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ProductImage name={product.imageName} resizeMode="contain" style={styles.image} />
      <PriceBlock product={product} />
      <Text style={[typography.sectionTitle, {color: colors.textPrimary}]}>{product.title}</Text>
      <RatingRow rating={product.rating} reviewCount={product.reviewCount} />
      {product.urgency != null && (
        <Text style={[typography.secondary, {color: colors.priceSale}]}>{product.urgency}</Text>
      )}
      <CTAButton date={product.deliveryDate} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.backgroundApp},
  content: {padding: layout.gutter, gap: 16},
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: layout.cornerImage,
    backgroundColor: colors.surfaceCard,
  },
});
