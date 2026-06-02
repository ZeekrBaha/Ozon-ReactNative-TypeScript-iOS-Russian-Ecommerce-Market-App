import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {brand} from '../theme/brand';

// Centered brand pill (architecture.md §6, red-line #1). The screen provides the
// `insets.top + 8` spacing above it.
export const AppLogoHeader: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.pill} testID="brandPill">
      <Text style={styles.wordmark}>{brand.wordmark}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {alignItems: 'center'},
  pill: {
    height: 30,
    paddingHorizontal: 14,
    borderRadius: 15,
    backgroundColor: brand.pillColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordmark: {fontSize: 15, fontWeight: '800', color: brand.wordmarkColor},
});
