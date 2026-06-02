import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {SettingsItem} from '../models/types';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {Icon} from './Icon';

// Settings row (design.md §3.9): title, optional value pill, chevron, hairline.
export const SettingsRow: React.FC<{item: SettingsItem; showDivider: boolean}> = ({
  item,
  showDivider,
}) => (
  <View>
    <View style={styles.row}>
      <Text style={[typography.body, {color: colors.textPrimary}]}>{item.title}</Text>
      <View style={styles.trailing}>
        {item.value != null && (
          <View style={styles.pill}>
            <Text style={[typography.secondary, {color: colors.textSecondary}]}>{item.value}</Text>
          </View>
        )}
        <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
      </View>
    </View>
    {showDivider && <View style={styles.divider} />}
  </View>
);

const styles = StyleSheet.create({
  row: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trailing: {flexDirection: 'row', alignItems: 'center', gap: 8},
  pill: {
    backgroundColor: colors.searchFill,
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  divider: {height: StyleSheet.hairlineWidth, backgroundColor: colors.separator, marginLeft: 16},
});
