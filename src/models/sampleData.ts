import type {Product, Category, QuickAction, SettingsItem, Banner} from './types';

// Single source of truth for all mock content (red-line #7). Reached ONLY through
// SampleDataRepository — no screen or hook imports this module directly.

const watch: Product = {
  id: 'watch',
  imageName: 'watch',
  imageCount: 6,
  isFavorite: true,
  badge: 'salesOfWeek',
  installmentPrice: '1398 ₸',
  installmentTerm: '×12 мес',
  salePrice: '16 769 ₸',
  oldPrice: '154 967 ₸',
  discountPercent: 89,
  urgency: '218 шт осталось',
  title: 'Смарт часы женские круглые, 2 ремешка, smart watch',
  rating: 4.7,
  reviewCount: 6,
  deliveryDate: '6 июня',
};

const pedicure: Product = {
  id: 'pedicure',
  imageName: 'pedicure',
  imageCount: 5,
  isFavorite: false,
  badge: null,
  installmentPrice: '118 ₸',
  installmentTerm: '×12 мес',
  salePrice: '1405 ₸',
  oldPrice: null,
  discountPercent: null,
  urgency: null,
  title: 'Педикюрный инструмент для выпрямления вросших ногтей',
  rating: 4.7,
  reviewCount: 122,
  deliveryDate: '22 июня',
};

const swimwear: Product = {
  id: 'swimwear',
  imageName: 'swimwear',
  imageCount: 1,
  isFavorite: true,
  badge: null,
  installmentPrice: '490 ₸',
  installmentTerm: '×12 мес',
  salePrice: '3 990 ₸',
  oldPrice: '7 990 ₸',
  discountPercent: 50,
  urgency: null,
  title: 'Купальник раздельный пуш-ап с высокой посадкой',
  rating: 4.7,
  reviewCount: 210,
  deliveryDate: '9 июня',
};

const bikini: Product = {
  id: 'bikini',
  imageName: 'bikini',
  imageCount: 4,
  isFavorite: true,
  badge: null,
  installmentPrice: '590 ₸',
  installmentTerm: '×12 мес',
  salePrice: '4 990 ₸',
  oldPrice: '9 990 ₸',
  discountPercent: 50,
  urgency: null,
  title: 'Купальник женский раздельный с цветочным принтом',
  rating: 4.8,
  reviewCount: 340,
  deliveryDate: '8 июня',
};

const silverWatch: Product = {
  id: 'silverWatch',
  imageName: 'silverWatch',
  imageCount: 3,
  isFavorite: false,
  badge: null,
  installmentPrice: '990 ₸',
  installmentTerm: '×12 мес',
  salePrice: '11 900 ₸',
  oldPrice: '23 800 ₸',
  discountPercent: 50,
  urgency: null,
  title: 'Часы наручные женские с браслетом, серебро',
  rating: 4.6,
  reviewCount: 88,
  deliveryDate: '10 июня',
};

const wallet: Product = {
  id: 'wallet',
  imageName: 'wallet',
  imageCount: 2,
  isFavorite: false,
  badge: null,
  installmentPrice: '320 ₸',
  installmentTerm: '×12 мес',
  salePrice: '3 200 ₸',
  oldPrice: null,
  discountPercent: null,
  urgency: null,
  title: 'Кошелёк женский кожаный клатч на молнии',
  rating: 4.5,
  reviewCount: 45,
  deliveryDate: '12 июня',
};

const allProducts: Product[] = [watch, pedicure, swimwear, bikini, silverWatch, wallet];

export const sampleData = {
  products: allProducts,
  featuredFavorite: watch,
  recommended: [bikini, silverWatch, watch, wallet, swimwear, pedicure] as Product[],
  viewed: [watch, pedicure, swimwear, bikini] as Product[],

  categories: [
    {id: 'cat_women', title: 'Женская одежда', imageName: 'cat_women'},
    {id: 'cat_men', title: 'Мужская одежда', imageName: 'cat_men'},
    {id: 'cat_shoes', title: 'Обувь', imageName: 'cat_shoes'},
    {id: 'cat_kids', title: 'Детская одежда', imageName: 'cat_kids'},
    {id: 'cat_jewelry', title: 'Ювелирные украшения', imageName: 'cat_jewelry'},
    {id: 'cat_electronics', title: 'Электроника', imageName: 'cat_electronics'},
    {id: 'cat_appliances', title: 'Бытовая техника', imageName: 'cat_appliances'},
    {id: 'cat_beauty', title: 'Красота и здоровье', imageName: 'cat_beauty'},
    {id: 'cat_home', title: 'Дом и сад', imageName: 'cat_home'},
    {id: 'cat_furniture', title: 'Мебель', imageName: 'cat_furniture'},
    {id: 'cat_accessories', title: 'Аксессуары', imageName: 'cat_accessories'},
    {id: 'cat_tools', title: 'Строительство и ремонт', imageName: 'cat_tools'},
    {id: 'cat_auto', title: 'Автотовары', imageName: 'cat_auto'},
    {id: 'cat_food', title: 'Продукты питания', imageName: 'cat_food'},
    {id: 'cat_pets', title: 'Товары для животных', imageName: 'cat_pets'},
    {id: 'cat_baby', title: 'Детские товары', imageName: 'cat_baby'},
    {id: 'cat_sport', title: 'Спорт и отдых', imageName: 'cat_sport'},
    {id: 'cat_books', title: 'Книги', imageName: 'cat_books'},
  ] as Category[],

  banners: [
    {id: 'banner_computers', imageName: 'banner_computers'},
    {id: 'banner_cosmetics', imageName: 'banner_cosmetics'},
    {id: 'banner_gadgets', imageName: 'banner_gadgets'},
    {id: 'banner_home', imageName: 'banner_home'},
  ] as Banner[],

  quickActions: [
    {id: 'qa_catalog', title: 'Каталог', imageName: 'qa_catalog'},
    {id: 'qa_fast', title: 'Быстрая доставка', imageName: 'qa_fast'},
    {id: 'qa_installment', title: 'Рассрочка 0-0-12', imageName: 'qa_installment'},
    {id: 'qa_kz', title: 'Сделано в Казахстане', imageName: 'qa_kz'},
    {id: 'qa_select', title: 'Ozon Селект', imageName: 'qa_select'},
    {id: 'qa_china', title: 'Товары из Китая', imageName: 'qa_china'},
  ] as QuickAction[],

  settings: [
    {id: 'currency', title: 'Валюта', value: 'KZT'},
    {id: 'appColor', title: 'Цвет приложения', value: null},
    {id: 'language', title: 'Язык', value: null},
    {id: 'help', title: 'Помощь', value: null},
    {id: 'about', title: 'О приложении', value: null},
  ] as SettingsItem[],
};
