import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-elements';

import { PRIMARY_COLOR } from '../../config/constants/constants';
import { IndexItem, TagCategory } from '../../config/types';

type Props = {
  readonly item: IndexItem;
};

function Tags({ item }: Props) {
  const tags = Object.values(TagCategory)
    .flatMap((category: string) => {
      if (`${category}` in item) {
        // @ts-expect-error
        return collection[category] ?? [];
      }
      return [];
    })
    .toSorted((a, b) => (a > b ? 1 : -1));

  const tagComponents = tags?.map((name, idx) => (
    <Chip
      key={`${name}-${idx}`}
      // need both styles to apply correctly
      titleStyle={styles.chip}
      buttonStyle={styles.chip}
      title={name}
      type="outline"
    />
  ));

  if (tagComponents?.length) {
    return <View style={styles.container}>{tagComponents}</View>;
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginVertical: 10,
  },
  chip: {
    color: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
});

export default Tags;
