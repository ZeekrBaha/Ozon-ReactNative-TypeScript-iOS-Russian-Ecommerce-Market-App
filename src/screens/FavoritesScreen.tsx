import React from 'react';
import {ScrollView, View, StyleSheet, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFavoritesViewModel} from '../viewmodels/useFavoritesViewModel';
import {AppLogoHeader} from '../components/AppLogoHeader';
import {SearchBar} from '../components/SearchBar';
import {SortChip, FilterChip} from '../components/FilterChip';
import {ProductCard} from '../components/ProductCard';
import {ProductGrid} from '../components/ProductGrid';
import {SectionHeader} from '../components/SectionHeader';
import {colors} from '../theme/colors';
import {layout, productCardWidth} from '../theme/spacing';
import type {TabStackParamList} from '../navigation/routes';
import type {Product} from '../models/types';

// Screen 3 — Избранное. Filter row + compact left-aligned featured + 2-col grid.
export const FavoritesScreen: React.FC = () => {
  const {featured, recommended} = useFavoritesViewModel();
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
      <View style={styles.gutter}>
        <SearchBar fill={colors.searchFill} trailing={['camera']} />
      </View>
      <View style={[styles.gutter, styles.filters]}>
        <SortChip />
        <FilterChip kind="filters" />
        <FilterChip kind="brand" />
      </View>
      <View style={styles.gutter}>
        <View style={{width: cardW}}>
          <ProductCard product={featured} variant="featuredCompact" onPress={() => go(featured)} />
        </View>
      </View>
      <View style={styles.gutter}>
        <SectionHeader title="Подобрали для вас" />
      </View>
      <View style={styles.gutter}>
        <ProductGrid products={recommended} cardWidth={cardW} onSelect={go} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.backgroundApp},
  gutter: {paddingHorizontal: layout.gutter},
  filters: {flexDirection: 'row', gap: 10, alignItems: 'center'},
});
