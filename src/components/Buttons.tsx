import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import {layout} from '../theme/spacing';
import {typography} from '../theme/typography';
import {Icon} from './Icon';

// Inert button visuals (design.md §3.5, §3.11) — presentational prototype.

export const PrimaryButton: React.FC<{title: string}> = ({title}) => (
  <View style={[styles.pill, {backgroundColor: colors.brandPrimary}]}>
    <Text style={[typography.cta, {color: '#FFFFFF'}]}>{title}</Text>
  </View>
);

export const SoftButton: React.FC<{title: string}> = ({title}) => (
  <View style={[styles.pill, {backgroundColor: colors.brandPrimarySoft}]}>
    <Text style={[typography.cta, {color: colors.brandPrimary}]}>{title}</Text>
  </View>
);

// In-card CTA: basket + delivery date, full-width, height 44.
export const CTAButton: React.FC<{date: string}> = ({date}) => (
  <View style={styles.cta}>
    <Icon name="basket-outline" size={18} color="#FFFFFF" />
    <Text style={[typography.cta, {color: '#FFFFFF'}]}>{date}</Text>
  </View>
);

// Cart "Войти" — auto-width soft capsule.
export const CartLoginButton: React.FC = () => (
  <View style={styles.cartLogin}>
    <Text style={[typography.cta, {color: colors.brandPrimary}]}>Войти</Text>
  </View>
);

const styles = StyleSheet.create({
  pill: {
    height: 56,
    borderRadius: layout.cornerButtonLg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cta: {
    height: 44,
    borderRadius: layout.cornerButtonSm,
    backgroundColor: colors.brandPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  cartLogin: {
    height: 44,
    paddingHorizontal: 28,
    borderRadius: layout.cornerButtonSm,
    backgroundColor: colors.brandPrimarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
