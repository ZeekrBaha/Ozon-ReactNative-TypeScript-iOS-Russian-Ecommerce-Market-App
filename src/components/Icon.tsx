import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Single icon set (Ionicons) standing in for SF Symbols (design-system §5).
export const Icon: React.FC<{name: string; size?: number; color: string}> = ({
  name,
  size = 18,
  color,
}) => <Ionicons name={name} size={size} color={color} />;
