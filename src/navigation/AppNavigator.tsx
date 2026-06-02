import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {Icon} from '../components/Icon';
import {TabStackParamList} from './routes';

import {HomeScreen} from '../screens/HomeScreen';
import {CatalogScreen} from '../screens/CatalogScreen';
import {FavoritesScreen} from '../screens/FavoritesScreen';
import {CartScreen} from '../screens/CartScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {ProductDetailScreen} from '../screens/ProductDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<TabStackParamList>();

// Coordinator role: each tab is a stack (root + ProductDetail). Roots hide the
// header; the pushed detail shows it with a back button.
function createTabStack(Root: React.ComponentType): React.FC {
  return () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Root" component={Root} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{headerShown: true, title: 'Товар', headerBackTitle: 'Назад'}}
      />
    </Stack.Navigator>
  );
}

const HomeStack = createTabStack(HomeScreen);
const CatalogStack = createTabStack(CatalogScreen);
const FavoritesStack = createTabStack(FavoritesScreen);
const CartStack = createTabStack(CartScreen);
const ProfileStack = createTabStack(ProfileScreen);

const ICONS: Record<string, [string, string]> = {
  Главная: ['home-outline', 'home'],
  Каталог: ['search-outline', 'search'],
  Избранное: ['heart-outline', 'heart'],
  Корзина: ['basket-outline', 'basket'],
  'Мой Ozon': ['person-outline', 'person-circle'],
};

export const AppNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.brandPrimary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarLabelStyle: typography.tabLabel,
      tabBarStyle: {backgroundColor: colors.surfaceCard},
      tabBarIcon: ({focused, color, size}) => {
        const [inactive, active] = ICONS[route.name] ?? ['ellipse-outline', 'ellipse'];
        return <Icon name={focused ? active : inactive} size={size} color={color} />;
      },
    })}>
    <Tab.Screen name="Главная" component={HomeStack} />
    <Tab.Screen name="Каталог" component={CatalogStack} />
    <Tab.Screen name="Избранное" component={FavoritesStack} />
    <Tab.Screen name="Корзина" component={CartStack} />
    <Tab.Screen name="Мой Ozon" component={ProfileStack} />
  </Tab.Navigator>
);
