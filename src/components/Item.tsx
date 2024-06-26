import { Pressable, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { Context, DiscriminatedItem, ItemType } from '@graasp/sdk';

import { useNavigation } from '@react-navigation/native';

import { ITEM_LIST, ITEM_LIST_OPTIONS } from '../../e2e/constants/testIds';
import { ITEMS_TABLE_ROW_ICON_COLOR } from '../config/constants/constants';
import { ITEM_NAVIGATOR, ITEM_NAVIGATOR_ITEM } from '../navigation/names';
import { ItemScreenProps } from '../navigation/types';
import ItemIcon from './ItemIcon';
import ItemOptionsButton, {
  ItemOptionsButtonProps,
} from './common/ItemOptionsButton';
import PlayerButton from './common/PlayerButton';

interface ItemProps {
  item: DiscriminatedItem;
  showOptions?: boolean;
  index: number;
  refresh: ItemOptionsButtonProps['refresh'];
}

const Item = ({
  item,
  showOptions = false,
  index,
  refresh,
}: ItemProps): JSX.Element => {
  const { id, name, type, extra } = item;
  const { navigate } =
    useNavigation<ItemScreenProps<'ItemStackItem'>['navigation']>();
  async function handleItemPress() {
    navigate(ITEM_NAVIGATOR, {
      screen: ITEM_NAVIGATOR_ITEM,
      params: { itemId: id, headerTitle: name },
    });
  }

  return (
    <ListItem testID={`${ITEM_LIST}-${index + 1}`}>
      <ListItem.Content style={{ width: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Pressable
            onPress={() => handleItemPress()}
            style={{ flex: 2, flexDirection: 'row', gap: 10 }}
          >
            <ItemIcon type={type} extra={extra} />
            <ListItem.Title style={{ flex: 2 }}>{name}</ListItem.Title>
          </Pressable>
          {showOptions && (
            <>
              {type === ItemType.FOLDER && (
                <PlayerButton
                  name={name}
                  type={type}
                  itemId={id}
                  origin={{ rootId: id, context: Context.Builder }}
                />
              )}
              <ItemOptionsButton
                refresh={refresh}
                item={item}
                color={ITEMS_TABLE_ROW_ICON_COLOR}
                testId={`${ITEM_LIST_OPTIONS}-${index + 1}`}
              />
            </>
          )}
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default Item;
