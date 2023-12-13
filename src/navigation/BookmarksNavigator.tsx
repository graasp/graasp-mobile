import { useTranslation } from 'react-i18next';

import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/common/Header';
import { defaultScreenOptions } from '../config/constants/navigation';
import BookmarksScreen from '../screens/bookmarks/BookmarksScreen';
import { BOOKMARKS_NAVIGATOR, BOOKMARKS_NAVIGATOR_BOOKMARKS } from './names';
import { BookmarksStackParamList } from './types';

const Stack = createStackNavigator<BookmarksStackParamList>();

const BookmarksStackNavigator = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      id={BOOKMARKS_NAVIGATOR}
      initialRouteName={BOOKMARKS_NAVIGATOR_BOOKMARKS}
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen
        name={BOOKMARKS_NAVIGATOR_BOOKMARKS}
        component={BookmarksScreen}
        options={{
          title: '',
          headerLeft: () => <Header title={t('Bookmarks')} />,
          headerLeftContainerStyle: { paddingLeft: 10 },
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default BookmarksStackNavigator;
