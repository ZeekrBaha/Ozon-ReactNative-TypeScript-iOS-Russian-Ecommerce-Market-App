import React, {useState} from 'react';
import {Image, View, StyleSheet, StyleProp, ImageStyle} from 'react-native';
import {images} from '../assets/images';
import {colors} from '../theme/colors';
import {Icon} from './Icon';

// Asset image with the mandatory placeholder fallback (design.md §3.0, F6/N6):
// a `searchFill` box + a `photo` glyph when the asset is missing or errors.
export const ProductImage: React.FC<{
  name: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain';
}> = ({name, style, resizeMode = 'cover'}) => {
  const [errored, setErrored] = useState(false);
  const source = images[name];

  if (!source || errored) {
    return (
      <View style={[styles.placeholder, style as object]}>
        <Icon name="image-outline" size={28} color={colors.textSecondary} />
      </View>
    );
  }
  return (
    <Image
      source={source}
      resizeMode={resizeMode}
      style={style}
      onError={() => setErrored(true)}
    />
  );
};

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: colors.searchFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
