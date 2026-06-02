import React from 'react';
import {Text} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';

// Leading-aligned section title (design.md §3.10).
export const SectionHeader: React.FC<{title: string}> = ({title}) => (
  <Text style={[typography.sectionTitle, {color: colors.textPrimary}]}>{title}</Text>
);
