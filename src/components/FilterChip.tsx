import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {Icon} from './Icon';

// Filter row chips (design.md §3.7). Inert.

export const SortChip: React.FC = () => (
  <View style={styles.sort}>
    <Icon name="swap-vertical" size={16} color={colors.textPrimary} />
  </View>
);

export const FilterChip: React.FC<{kind: 'filters' | 'brand'}> = ({kind}) => (
  <View style={styles.chip}>
    {kind === 'filters' && (
      <Icon name="options-outline" size={15} color={colors.textPrimary} />
    )}
    <Text style={[typography.body, {color: colors.textPrimary}]}>
      {kind === 'filters' ? 'Фильтры' : 'Бренд'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  sort: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.searchFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    height: 42,
    borderRadius: 21,
    paddingHorizontal: 16,
    backgroundColor: colors.searchFill,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
