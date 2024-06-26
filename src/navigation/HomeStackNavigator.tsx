import { useTranslation } from 'react-i18next';

import { createStackNavigator } from '@react-navigation/stack';

import { defaultScreenOptions } from '../config/constants/navigation';
import HomeScreen from '../screens/home/HomeScreen';
import { HOME_NAVIGATOR, HOME_NAVIGATOR_HOME } from './names';
import { HomeStackParamList } from './types';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      id={HOME_NAVIGATOR}
      initialRouteName="HomeStack"
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen
        name={HOME_NAVIGATOR_HOME}
        component={HomeScreen}
        options={{
          title: t('Home'),
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
