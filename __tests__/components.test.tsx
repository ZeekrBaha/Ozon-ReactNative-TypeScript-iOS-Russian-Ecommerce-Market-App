/**
 * Leaf component tests.
 * @format
 */
import React from 'react';
import {render} from '@testing-library/react-native';

jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');

import {PriceBlock} from '../src/components/PriceBlock';
import {RatingRow} from '../src/components/RatingRow';
import {CategoryCard} from '../src/components/CategoryCard';
import {SearchBar} from '../src/components/SearchBar';
import {sampleData} from '../src/models/sampleData';

describe('PriceBlock', () => {
  it('renders sale price, struck old price, discount and urgency', () => {
    const {getByText} = render(<PriceBlock product={sampleData.featuredFavorite} />);
    expect(getByText('16 769 ₸')).toBeTruthy();
    expect(getByText('154 967 ₸')).toBeTruthy();
    expect(getByText('-89%')).toBeTruthy();
    expect(getByText('218 шт осталось')).toBeTruthy();
  });
});

describe('RatingRow', () => {
  it('renders the rating and pluralized review count', () => {
    const {getByText} = render(<RatingRow rating={4.7} reviewCount={6} />);
    expect(getByText('4.7')).toBeTruthy();
    expect(getByText('6 отзывов')).toBeTruthy();
  });
});

describe('CategoryCard', () => {
  it('renders the category title', () => {
    const {getByText} = render(<CategoryCard category={sampleData.categories[5]} />);
    expect(getByText('Электроника')).toBeTruthy();
  });
});

describe('SearchBar', () => {
  it('renders the placeholder', () => {
    const {getByText} = render(<SearchBar trailing={['camera']} />);
    expect(getByText('Искать на Ozon')).toBeTruthy();
  });
});
