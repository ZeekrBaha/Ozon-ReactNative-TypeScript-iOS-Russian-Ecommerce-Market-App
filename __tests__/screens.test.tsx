/**
 * Screen rendering + navigation tests.
 * @format
 */
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({top: 59, bottom: 34, left: 0, right: 0}),
  SafeAreaProvider: ({children}: {children: React.ReactNode}) => children,
}));

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: mockNavigate}),
  useRoute: () => ({params: {productId: 'watch'}}),
}));

import {RepositoryProvider} from '../src/services/RepositoryContext';
import {HomeScreen} from '../src/screens/HomeScreen';
import {CatalogScreen} from '../src/screens/CatalogScreen';
import {FavoritesScreen} from '../src/screens/FavoritesScreen';
import {CartScreen} from '../src/screens/CartScreen';
import {ProfileScreen} from '../src/screens/ProfileScreen';
import {ProductDetailScreen} from '../src/screens/ProductDetailScreen';

const wrap = (ui: React.ReactElement) => render(<RepositoryProvider>{ui}</RepositoryProvider>);

beforeEach(() => mockNavigate.mockClear());

describe('screens render their content marker', () => {
  it('Home → Рекомендуем', () => {
    expect(wrap(<HomeScreen />).getByText('Рекомендуем')).toBeTruthy();
  });
  it('Catalog → a category', () => {
    expect(wrap(<CatalogScreen />).getByText('Электроника')).toBeTruthy();
  });
  it('Favorites → section header', () => {
    expect(wrap(<FavoritesScreen />).getByText('Подобрали для вас')).toBeTruthy();
  });
  it('Cart → empty band', () => {
    expect(wrap(<CartScreen />).getByText('Корзина пуста')).toBeTruthy();
  });
  it('Profile → CTA', () => {
    expect(wrap(<ProfileScreen />).getByText('Войдите в личный кабинет')).toBeTruthy();
  });
  it('ProductDetail → renders the product by route id', () => {
    // useRoute mock returns { productId: 'watch' }
    expect(
      wrap(<ProductDetailScreen />).getByText('Смарт часы женские круглые, 2 ремешка, smart watch'),
    ).toBeTruthy();
  });
});

describe('navigation flow — product → ProductDetail from every product tab', () => {
  const cases: [string, React.ReactElement][] = [
    ['Home', <HomeScreen />],
    ['Favorites', <FavoritesScreen />],
    ['Cart', <CartScreen />],
    ['Profile', <ProfileScreen />],
  ];
  it.each(cases)('%s: pressing a card navigates to ProductDetail', (_name, ui) => {
    const {getAllByTestId} = wrap(ui);
    fireEvent.press(getAllByTestId('productCard')[0]);
    expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', {
      productId: expect.any(String),
    });
  });
});
