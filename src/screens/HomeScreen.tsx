import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import {useHomeViewModel} from '../viewmodels/useHomeViewModel';
import {AppLogoHeader} from '../components/AppLogoHeader';
import {SearchBar} from '../components/SearchBar';
import {BannerCarousel} from '../components/BannerCarousel';
import {QuickAction} from '../components/QuickAction';
import {ProductGrid} from '../components/ProductGrid';
import {SectionHeader} from '../components/SectionHeader';
import {Icon} from '../components/Icon';
import {colors} from '../theme/colors';
import {brand} from '../theme/brand';
import {layout, productCardWidth} from '../theme/spacing';
import {typography} from '../theme/typography';
import type {TabStackParamList} from '../navigation/routes';
import type {Product} from '../models/types';

// Screen 1 — Главная. Gradient header (hero inside, red-line #6) + carousel + rail + grid.
export const HomeScreen: React.FC = () => {
  const {banners, quickActions, recommended, bannerIndex, syncBannerIndex} = useHomeViewModel();
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const cardW = productCardWidth(width);
  const carouselW = width - 2 * layout.gutter;
  const nav = useNavigation<NativeStackNavigationProp<TabStackParamList>>();
  const go = (p: Product) => nav.navigate('ProductDetail', {productId: p.id});

  return (
    <ScrollView
      testID="homeScreen"
      style={styles.screen}
      contentContainerStyle={{paddingBottom: insets.bottom + 24, gap: 20}}>
      {/* Gradient header — bleeds under the status bar. Gradient is an absolute
          background so the container sizes to its children (New Arch sizing fix). */}
      <View testID="homeHeader" style={[styles.header, {paddingTop: insets.top + 8}]}>
        <LinearGradient
          colors={[brand.gradientTop, brand.gradientBottom]}
          style={StyleSheet.absoluteFill}
        />
        <AppLogoHeader />

        <View style={styles.cityRow}>
          <View style={styles.cityLeft}>
            <Text style={styles.cityText}>Астана</Text>
            <Icon name="chevron-down" size={13} color="#FFFFFF" />
          </View>
          <View style={styles.darkPill}>
            <Text style={styles.darkPillText}>Войти</Text>
          </View>
        </View>

        <SearchBar fill="#FFFFFF" trailing={['barcode', 'camera']} />

        <View style={styles.hero}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroHeadline}>{'ПРАЗДНИК\nПРИЛЕТИТ'}</Text>
            <View style={styles.countdown}>
              <Text style={styles.countdownText}>19:45:13 до старта</Text>
              <Icon name="chevron-forward" size={12} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.heroRight}>
            <Text style={styles.heroBig}>О!</Text>
            <Text style={styles.heroSale}>РАСПРОДАЖА</Text>
          </View>
        </View>
      </View>

      {/* Carousel */}
      <View style={styles.gutter}>
        <BannerCarousel
          banners={banners}
          width={carouselW}
          index={bannerIndex}
          onIndexChange={syncBannerIndex}
        />
      </View>

      {/* Quick actions rail */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rail}>
        {quickActions.map(a => (
          <QuickAction key={a.id} action={a} />
        ))}
      </ScrollView>

      {/* Recommended grid */}
      <View style={styles.gutter}>
        <SectionHeader title="Рекомендуем" />
      </View>
      <View style={styles.gutter}>
        <ProductGrid products={recommended} cardWidth={cardW} onSelect={go} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.backgroundApp},
  header: {
    paddingHorizontal: layout.gutter,
    paddingBottom: 20,
    gap: 10,
    borderBottomLeftRadius: layout.cornerSheet,
    borderBottomRightRadius: layout.cornerSheet,
    overflow: 'hidden',
  },
  cityRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  cityLeft: {flexDirection: 'row', alignItems: 'center', gap: 4},
  cityText: {fontSize: 17, fontWeight: '600', color: '#FFFFFF'},
  darkPill: {
    height: 36,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: colors.buttonDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkPillText: {fontSize: 15, fontWeight: '600', color: '#FFFFFF'},
  hero: {flexDirection: 'row', alignItems: 'center', marginTop: 4},
  heroLeft: {flex: 1, gap: 10, alignItems: 'flex-start'},
  heroHeadline: {fontSize: 26, fontWeight: '800', color: '#FFFFFF'},
  countdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: colors.buttonDark,
  },
  countdownText: {fontSize: 14, fontWeight: '600', color: '#FFFFFF'},
  heroRight: {alignItems: 'flex-end'},
  heroBig: {fontSize: 40, fontWeight: '900', color: '#FFFFFF'},
  heroSale: {fontSize: 18, fontWeight: '800', color: '#FFFFFF'},
  gutter: {paddingHorizontal: layout.gutter},
  rail: {paddingHorizontal: layout.gutter, gap: 14},
});
