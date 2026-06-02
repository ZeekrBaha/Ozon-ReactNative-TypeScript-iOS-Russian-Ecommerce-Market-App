import React, {useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import type {Banner} from '../models/types';
import {colors} from '../theme/colors';
import {ProductImage} from './ProductImage';

// Paged banner carousel (design.md Screen 1 / §6). Index is driven by the Home
// view model; user swipes report back via onIndexChange.
const HEIGHT = 150;

export const BannerCarousel: React.FC<{
  banners: Banner[];
  width: number;
  index: number;
  onIndexChange: (index: number) => void;
}> = ({banners, width, index, onIndexChange}) => {
  const ref = useRef<FlatList<Banner>>(null);

  useEffect(() => {
    if (width > 0 && banners.length > 0) {
      ref.current?.scrollToIndex({index, animated: true});
    }
  }, [index, width, banners.length]);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / Math.max(width, 1));
    onIndexChange(page);
  };

  return (
    <View>
      <FlatList
        ref={ref}
        data={banners}
        keyExtractor={b => b.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        getItemLayout={(_, i) => ({length: width, offset: width * i, index: i})}
        renderItem={({item}) => (
          <ProductImage name={item.imageName} style={{width, height: HEIGHT, borderRadius: 16}} />
        )}
      />
      <View style={styles.dots}>
        {banners.map((b, i) => (
          <View
            key={b.id}
            style={[styles.dot, {opacity: i === index ? 1 : 0.4}]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dots: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {width: 6, height: 6, borderRadius: 3, backgroundColor: colors.surfaceCard},
});
