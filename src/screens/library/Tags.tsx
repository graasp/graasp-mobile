import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-elements';

import { DiscriminatedItem, IndexItem } from '@graasp/sdk';

import { PRIMARY_COLOR } from '../../config/constants/constants';
import { useTagsByItem } from '../../hooks/tag';

type Props = {
  item: DiscriminatedItem | IndexItem;
};

function Tags({ item }: Props) {
  const { data: tags } = useTagsByItem({ itemId: item.id });

  const tagComponents = tags?.map(({ name, id }) => (
    <Chip
      key={id}
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
