import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-elements';

import { DiscriminatedItem } from '@graasp/sdk';

import { useNavigation } from '@react-navigation/native';

import { buildLibraryCardId } from '../../../e2e/constants/testIds';
import { TagCategory } from '../../config/types';
import { LIBRARY_NAVIGATOR_COLLECTION } from '../../navigation/names';
import { LibraryScreenProp } from '../../navigation/types';
import CollectionCreator from './CollectionCreator';
import CollectionThumbnail from './CollectionThumbnail';
import Tags from './Tags';

type Props = {
  item: DiscriminatedItem;
};

const CollectionCard = ({ item }: Props) => {
  const { navigate } =
    useNavigation<LibraryScreenProp<'CollectionStack'>['navigation']>();

  const tags = Object.values(TagCategory)
    .flatMap((category: string) => {
      if (`${category}` in item) {
        // @ts-expect-error
        return collection[category] ?? [];
      }
      return [];
    })
    .toSorted((a, b) => (a > b ? 1 : -1));

  return (
    <TouchableOpacity
      testID={buildLibraryCardId(item.id)}
      onPress={() => {
        navigate(LIBRARY_NAVIGATOR_COLLECTION, { itemId: item.id });
      }}
    >
      {/* @ts-ignore */}
      <Card containerStyle={styles.container}>
        <CollectionThumbnail item={item} />
        <View style={styles.content}>
          <Card.Title h4 style={styles.title}>
            {item.name}
          </Card.Title>
          <CollectionCreator item={item} />
          <Tags tags={tags} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'lightgrey',
    padding: 0,
    overflow: 'hidden',
    borderRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    textAlign: 'left',
  },
});

export default CollectionCard;
