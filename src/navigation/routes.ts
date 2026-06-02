// Each tab is a native-stack with its root screen + the shared ProductDetail route.
export type TabStackParamList = {
  Root: undefined;
  ProductDetail: {productId: string};
};

export type TabName = 'Главная' | 'Каталог' | 'Избранное' | 'Корзина' | 'Мой Ozon';
