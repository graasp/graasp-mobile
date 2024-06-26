import { useTranslation } from 'react-i18next';

import { createStackNavigator } from '@react-navigation/stack';

import { defaultScreenOptions } from '../config/constants/navigation';
import ProfileScreen from '../screens/ProfileScreen';
import { PROFILE_NAVIGATOR, PROFILE_NAVIGATOR_PROFILE } from './names';
import { ProfileStackParamList } from './types';

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  const { t } = useTranslation();
  return (
    <ProfileStack.Navigator
      id={PROFILE_NAVIGATOR}
      initialRouteName="ProfileStackProfile"
      screenOptions={defaultScreenOptions}
    >
      <ProfileStack.Screen
        name={PROFILE_NAVIGATOR_PROFILE}
        component={ProfileScreen}
        options={() => ({
          title: t('Profile'),
        })}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
