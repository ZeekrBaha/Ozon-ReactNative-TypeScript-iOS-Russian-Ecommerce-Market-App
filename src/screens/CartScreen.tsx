import React from 'react';
import {ScrollView, View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useCartViewModel} from '../viewmodels/useCartViewModel';
import {AppLogoHeader} from '../components/AppLogoHeader';
import {SectionHeader} from '../components/SectionHeader';
import {ProductGrid} from '../components/ProductGrid';
import {CartLoginButton} from '../components/Buttons';
import {Icon} from '../components/Icon';
import {colors} from '../theme/colors';
import {layout, productCardWidth} from '../theme/spacing';
import {typography} from '../theme/typography';
import type {TabStackParamList} from '../navigation/routes';
import type {Product} from '../models/types';

// Screen 4 — Корзина (empty). Full-width empty band (red-line #3) + "Вы смотрели".
export const CartScreen: React.FC = () => {
  const {viewed, isEmpty, city} = useCartViewModel();
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const cardW = productCardWidth(width);
  const nav = useNavigation<NativeStackNavigationProp<TabStackParamList>>();
  const go = (p: Product) => nav.navigate('ProductDetail', {productId: p.id});

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24, gap: 16}}>
      <AppLogoHeader />

      <View style={[styles.gutter, styles.cityRow]}>
        <Text style={[typography.body, {color: colors.textPrimary}]}>{city}</Text>
        <Icon name="chevron-down" size={14} color={colors.textPrimary} />
      </View>

      {isEmpty && (
        <View style={styles.band} testID="cartEmptyBand">
          <Text style={[typography.sectionTitle, styles.center, {color: colors.textPrimary}]}>
            Корзина пуста
          </Text>
          <Text style={[typography.body, styles.center, {color: colors.textSecondary}]}>
            Воспользуйтесь поиском, чтобы найти всё, что нужно. Если в Корзине были товары,
            войдите, чтобы посмотреть список
          </Text>
          <CartLoginButton />
        </View>
      )}

      <View style={styles.gutter}>
        <SectionHeader title="Вы смотрели" />
      </View>
      <View style={styles.gutter}>
        <ProductGrid products={viewed} cardWidth={cardW} onSelect={go} variant="viewedGrid" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.backgroundApp},
  gutter: {paddingHorizontal: layout.gutter},
  cityRow: {flexDirection: 'row', alignItems: 'center', gap: 4},
  band: {
    paddingVertical: 32,
    paddingHorizontal: layout.gutter,
    alignItems: 'center',
    gap: 12,
  },
  center: {textAlign: 'center'},
});
