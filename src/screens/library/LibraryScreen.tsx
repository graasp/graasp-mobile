import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { SearchBar, Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { DiscriminatedItem } from '@graasp/sdk';

import { LIBRARY_SEARCH_BAR } from '../../../e2e/constants/testIds';
import ActivityIndicator from '../../components/ActivityIndicator';
import { DEFAULT_LIBRARY_SEARCH_KEYWORDS } from '../../config/env';
import { useSearchPublishedItems } from '../../hooks/search';
import CollectionCard from './CollectionCard';

const LibraryScreen = () => {
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();
  const [page, setPage] = useState<number>(1);
  const [prevResults, setPrevResults] = useState<DiscriminatedItem[]>([]);
  const [
    hasEndReachedCalledDuringMomentum,
    sethasEndReachedCalledDuringMomentum,
  ] = useState(false);
  // default search field to avoid showing recent garbage
  const [searchKeywords, setSearchKeywords] = useState(
    DEFAULT_LIBRARY_SEARCH_KEYWORDS,
  );
  const dimensions = useWindowDimensions();
  const { data: collections, isLoading } = useSearchPublishedItems({
    query: searchKeywords,
    page,
    sort: ['createdAt:desc'],
    // // does not show children
    isPublishedRoot: true,
  });

  const allCollections = prevResults.concat(collections?.hits ?? []);

  const onSearch = (s: string) => {
    setSearchKeywords(s);
    setPage(1);
    setPrevResults([]);
  };

  const renderContent = () => {
    if (allCollections.length) {
      return (
        <FlatList
          style={{ height: dimensions.height }}
          data={allCollections}
          onEndReachedThreshold={0.1}
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={() => {
            sethasEndReachedCalledDuringMomentum(false);
          }}
          onEndReached={() => {
            if (!hasEndReachedCalledDuringMomentum) {
              setPrevResults(allCollections);
              setPage(page + 1);
              sethasEndReachedCalledDuringMomentum(true);
            }
          }}
          renderItem={({ item }) => <CollectionCard item={item} />}
        />
      );
    }

    if (isLoading) {
      return <ActivityIndicator />;
    }

    return (
      <SafeAreaView style={styles.container} edges={['left']}>
        <Text h4 style={{ textAlign: 'center', marginTop: insets.top }}>
          {t('No result found')}
        </Text>
      </SafeAreaView>
    );
  };
  return (
    <SafeAreaView style={styles.container} edges={['left']}>
      <SearchBar
        placeholder={t('Search Here...')}
        // @ts-ignore fix type
        onChangeText={(s) => {
          onSearch(s);
        }}
        lightTheme
        value={searchKeywords}
        containerStyle={{
          backgroundColor: 'transparent',
          borderBlockColor: 'white',
        }}
        round
        testID={LIBRARY_SEARCH_BAR}
      />
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
});

export default LibraryScreen;
