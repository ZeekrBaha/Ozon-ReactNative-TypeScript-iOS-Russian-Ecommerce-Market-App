import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import {layout} from '../theme/spacing';
import {typography} from '../theme/typography';
import {Icon} from './Icon';

export type SearchTrailing = 'barcode' | 'camera';

// Display-only search bar (design.md §3.1). Non-interactive.
export const SearchBar: React.FC<{
  fill?: string;
  trailing?: SearchTrailing[];
}> = ({fill = colors.searchFill, trailing = []}) => (
  <View style={[styles.bar, {backgroundColor: fill}]}>
    <Icon name="search" size={18} color={colors.textSecondary} />
    <Text style={[typography.body, styles.placeholder]}>Искать на Ozon</Text>
    {trailing.map(t => (
      <Icon
        key={t}
        name={t === 'barcode' ? 'barcode-outline' : 'camera-outline'}
        size={18}
        color={colors.textSecondary}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  bar: {
    height: 52,
    borderRadius: layout.cornerSearch,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  placeholder: {flex: 1, color: colors.textSecondary},
});
