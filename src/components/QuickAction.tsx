import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {QuickAction as QuickActionModel} from '../models/types';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {ProductImage} from './ProductImage';

// Quick-action tile (design.md §3.8): 56 image + 2-line caption, fixed width.
export const QuickAction: React.FC<{action: QuickActionModel}> = ({action}) => (
  <View style={styles.container}>
    <ProductImage name={action.imageName} style={styles.tile} />
    <Text numberOfLines={2} style={[typography.secondary, styles.caption]}>
      {action.title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {width: 76, alignItems: 'center', gap: 6},
  tile: {width: 56, height: 56, borderRadius: 14},
  caption: {color: colors.textPrimary, textAlign: 'center'},
});
