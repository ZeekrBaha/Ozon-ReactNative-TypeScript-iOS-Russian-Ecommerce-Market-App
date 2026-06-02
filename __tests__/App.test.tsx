/**
 * Unit + component tests.
 * @format
 */
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');

import {reviewWord} from '../src/components/RatingRow';
import {ProductCard} from '../src/components/ProductCard';
import {sampleData} from '../src/models/sampleData';

describe('reviewWord (ru pluralization)', () => {
  it('handles ones / few / many + teen exception', () => {
    expect(reviewWord(1)).toBe('отзыв');
    expect(reviewWord(2)).toBe('отзыва');
    expect(reviewWord(4)).toBe('отзыва');
    expect(reviewWord(5)).toBe('отзывов');
    expect(reviewWord(11)).toBe('отзывов');
    expect(reviewWord(13)).toBe('отзывов');
    expect(reviewWord(21)).toBe('отзыв');
    expect(reviewWord(22)).toBe('отзыва');
    expect(reviewWord(111)).toBe('отзывов');
  });
});

describe('ProductCard (keystone)', () => {
  it('fires onPress when tapped', () => {
    const onPress = jest.fn();
    const {getByTestId} = render(
      <ProductCard product={sampleData.featuredFavorite} onPress={onPress} />,
    );
    fireEvent.press(getByTestId('productCard'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders the sales badge for a badged product', () => {
    const {getByText} = render(
      <ProductCard product={sampleData.featuredFavorite} onPress={() => {}} />,
    );
    expect(getByText('СКИДКИ НЕДЕЛИ')).toBeTruthy();
  });
});
