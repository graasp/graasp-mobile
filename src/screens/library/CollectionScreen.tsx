import { useTranslation } from 'react-i18next';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';

import { formatDate } from '@graasp/sdk';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

import ActivityIndicator from '../../components/ActivityIndicator';
import { DEFAULT_LOCALE } from '../../config/constants/constants';
import i18n from '../../config/i18n';
import { useQueryClient } from '../../context/QueryClientContext';
import { useTagsByItem } from '../../hooks/tag';
import { LibraryScreenProp } from '../../navigation/types';
import CollectionContent from './CollectionContent';
import CollectionCreator from './CollectionCreator';
import CollectionScreenOptions from './CollectionScreenOptions';
import CollectionThumbnail from './CollectionThumbnail';
import Tags from './Tags';

const CollectionScreen = ({
  route: {
    params: { itemId },
  },
}: LibraryScreenProp<'CollectionStack'>) => {
  const { t } = useTranslation();
  const { width, height } = useWindowDimensions();
  const { hooks } = useQueryClient();
  const headerHeight = useHeaderHeight();
  const tabHeight = useBottomTabBarHeight();
  const { data: item, isLoading } = hooks.useItem(itemId);
  const { setOptions } = useNavigation();
  const { data: tags } = useTagsByItem({ itemId: item?.id });

  if (item) {
    setOptions({ title: item.name });

    const sortedTags = tags?.map(({ name }) => name) ?? [];
    sortedTags.sort();

    return (
      <SafeAreaView edges={['left']}>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <View
            style={{
              minHeight: height - headerHeight - tabHeight,
              ...styles.container,
            }}
          >
            <CollectionThumbnail item={item} />
            <Text h3 style={styles.title}>
              {item.name}
            </Text>
            <View style={styles.titleAndicon}>
              <CollectionCreator item={item} />
              <CollectionScreenOptions item={item} />
            </View>
            <Tags tags={sortedTags} />
            {item.description && (
              <RenderHTML
                defaultTextProps={{ numberOfLines: 2 }}
                contentWidth={width}
                source={{ html: item.description }}
              />
            )}
            <CollectionContent item={item} />
            <Divider style={styles.divider} />
            <Text>
              <Text style={{ fontWeight: 'bold' }}>{t('Creation Date')}: </Text>
              {formatDate(item.createdAt, {
                locale: i18n.language || DEFAULT_LOCALE,
              })}
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>{t('Last Update')}: </Text>
              {formatDate(item.updatedAt, {
                locale: i18n.language || DEFAULT_LOCALE,
              })}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return <Text>An error occured</Text>;
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 20,
  },
  divider: {
    marginVertical: 15,
  },
  titleAndicon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CollectionScreen;
