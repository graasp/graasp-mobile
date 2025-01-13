import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-elements';

import { PRIMARY_COLOR } from '../../config/constants/constants';

type Props = {
  readonly tags: string[];
};

function Tags({ tags }: Props) {
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
