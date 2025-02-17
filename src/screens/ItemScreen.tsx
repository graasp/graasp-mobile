import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Context, ItemType } from '@graasp/sdk';

import { useNavigation } from '@react-navigation/native';

import { ITEM_NAVIGATOR_ITEM_ERROR } from '../../e2e/constants/testIds';
import ActivityIndicator from '../components/ActivityIndicator';
import AppItem from '../components/AppItem';
import Document from '../components/Document';
import FileItem from '../components/FileItem';
import FolderItem from '../components/FolderItem';
import ItemUnsupported from '../components/ItemUnsupported';
import LinkItem from '../components/LinkItem';
import { useQueryClient } from '../context/QueryClientContext';
import { ItemScreenProps } from '../navigation/types';
import { useFocusQuery } from '../utils/functions/useQuery';

const ItemScreen = ({ route }: ItemScreenProps<'ItemStackItem'>) => {
  const { itemId } = route.params;
  const { hooks } = useQueryClient();
  const { data: item, isLoading, isError, refetch } = hooks.useItem(itemId);
  const { setOptions } = useNavigation();
  useFocusQuery(refetch);
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (item) {
      setOptions({ title: item.name });
    }
  }, [item]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError || !item) {
    setOptions({ title: t('Error') });
    return (
      <View
        style={{
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <Text testID={ITEM_NAVIGATOR_ITEM_ERROR} h4 style={styles.error}>
          {t(
            `An error occured. This item with id '${itemId}' might not exist or you cannot access it.`,
          )}
        </Text>
      </View>
    );
  }

  const renderContent = () => {
    switch (item.type) {
      case ItemType.FOLDER: {
        return <FolderItem item={item} />;
      }
      case ItemType.DOCUMENT: {
        return <Document item={item} />;
      }
      case ItemType.APP: {
        return <AppItem item={item} context={Context.Builder} />;
      }
      case ItemType.LINK: {
        return <LinkItem item={item} />;
      }
      case ItemType.LOCAL_FILE: {
        return <FileItem item={item} />;
      }
      default: {
        return <ItemUnsupported item={item} />;
      }
    }
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    color: '#4e4e4e',
  },
  value: {
    paddingBottom: 20,
  },
  error: {
    textAlign: 'center',
  },
});

export default ItemScreen;
