import React from 'react';
import {ScrollView, View, StyleSheet, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useCatalogViewModel} from '../viewmodels/useCatalogViewModel';
import {AppLogoHeader} from '../components/AppLogoHeader';
import {SearchBar} from '../components/SearchBar';
import {CategoryCard} from '../components/CategoryCard';
import {colors} from '../theme/colors';
import {layout, categoryCardWidth} from '../theme/spacing';

// Screen 2 — Каталог. Centered logo + search + 3-col category grid.
export const CatalogScreen: React.FC = () => {
  const {categories} = useCatalogViewModel();
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const cardW = categoryCardWidth(width);

  return (
    <ScrollView
      testID="catalogScreen"
      style={styles.screen}
      contentContainerStyle={{paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24, gap: 16}}>
      <AppLogoHeader />
      <View style={styles.gutter}>
        <SearchBar fill={colors.searchFill} trailing={['camera']} />
      </View>
      <View style={[styles.gutter, styles.grid]}>
        {categories.map(c => (
          <View key={c.id} style={{width: cardW}}>
            <CategoryCard category={c} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.backgroundApp},
  gutter: {paddingHorizontal: layout.gutter},
  grid: {flexDirection: 'row', flexWrap: 'wrap', gap: layout.gridSpacing},
});
