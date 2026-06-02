import React from 'react';
import {ScrollView, View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import {useProfileViewModel} from '../viewmodels/useProfileViewModel';
import {AppLogoHeader} from '../components/AppLogoHeader';
import {SettingsRow} from '../components/SettingsRow';
import {SectionHeader} from '../components/SectionHeader';
import {ProductGrid} from '../components/ProductGrid';
import {PrimaryButton, SoftButton} from '../components/Buttons';
import {Icon} from '../components/Icon';
import {colors} from '../theme/colors';
import {brand} from '../theme/brand';
import {layout, productCardWidth} from '../theme/spacing';
import {typography} from '../theme/typography';
import type {TabStackParamList} from '../navigation/routes';
import type {Product} from '../models/types';

// Screen 5 — Мой Ozon (logged out). Two separate white grouped sections (red-line #4).
export const ProfileScreen: React.FC = () => {
  const {settings, recommended} = useProfileViewModel();
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const cardW = productCardWidth(width);
  const nav = useNavigation<NativeStackNavigationProp<TabStackParamList>>();
  const go = (p: Product) => nav.navigate('ProductDetail', {productId: p.id});

  return (
    <ScrollView
      testID="profileScreen"
      style={styles.screen}
      contentContainerStyle={{paddingBottom: insets.bottom + 24, gap: 16}}>
      {/* A. CTA section — white, rounded bottom, bleeds under status bar */}
      <View testID="profileCta" style={[styles.cta, {paddingTop: insets.top + 8}]}>
        <AppLogoHeader />
        <LinearGradient colors={[brand.gradientTop, brand.gradientBottom]} style={styles.avatar}>
          <Icon name="person" size={46} color="#FFFFFF" />
        </LinearGradient>
        <Text style={[typography.screenTitle, styles.center, {color: colors.textPrimary}]}>
          Войдите в личный кабинет
        </Text>
        <Text style={[typography.body, styles.center, {color: colors.textSecondary}]}>
          Отслеживайте заказы, копите баллы и пользуйтесь персональными скидками
        </Text>
        <PrimaryButton title="Войти или зарегистрироваться" />
        <SoftButton title="Покупайте как юрлицо" />
        <Text style={[typography.secondary, styles.center]}>
          <Text style={{color: colors.textSecondary}}>Применяем </Text>
          <Text style={{color: colors.brandPrimary}}>рекомендательные технологии</Text>
        </Text>
      </View>

      {/* B. Settings group */}
      <View style={styles.gutter}>
        <View testID="profileSettings" style={styles.settings}>
          {settings.map((item, i) => (
            <SettingsRow key={item.id} item={item} showDivider={i < settings.length - 1} />
          ))}
        </View>
      </View>

      <View style={styles.gutter}>
        <SectionHeader title="Подобрали по вашим интересам" />
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
  center: {textAlign: 'center'},
  cta: {
    backgroundColor: colors.surfaceCard,
    borderBottomLeftRadius: layout.cornerSheet,
    borderBottomRightRadius: layout.cornerSheet,
    paddingHorizontal: layout.gutter,
    paddingBottom: 24,
    gap: 14,
    alignItems: 'stretch',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  settings: {
    backgroundColor: colors.surfaceCard,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
