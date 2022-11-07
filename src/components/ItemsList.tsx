import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  StyleSheet,
  FlatList,
  Share,
} from 'react-native';
import Item from './Item';
import { Button, Divider, ListItem, Overlay } from 'react-native-elements';
import EmptyList from './common/EmptyList';
import CustomBackdrop from './common/CustomBackdrop';
import ItemIcon from './ItemIcon';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Item as ItemType, UUID } from '../types';
import { HomeStackPropsNavigationProp } from '../screens/HomeScreen';
import { SHARE_HOST, SHARE_OPTIONS } from '../config/constants/constants';

interface ItemsListProps {
  items: ItemType[];
  refresh: () => void;
  isLoading: boolean;
}

const ItemsList: FC<ItemsListProps> = ({
  items,
  refresh,
  isLoading,
}) => {
  const [modalVisible, setModalVisible] = useState< { toggle: boolean, itemId: UUID | null } >({
    toggle: false,
    itemId: null,
  });
  const navigation = useNavigation<HomeStackPropsNavigationProp>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['30%', '60%', '90%'], []);
  const [itemSelected, setItemSelected] = useState<ItemType | null>(null);
  const insets = useSafeAreaInsets();
  
  const handlePresentModalPress = useCallback(
    ({ id }: { id: UUID }) => {
      console.log('pressed itemId: ', id);
      const itemSelected = items.find((it: ItemType) => it.id === id);
      console.log('item selected is: ', itemSelected);
      if (itemSelected) {
        setItemSelected(itemSelected);
        bottomSheetModalRef.current?.present();
      }
    },
    [items]);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderItem = ({ item }: { item: ItemType }) => {
    return (
      <Item
        item={item}
        openOptions={handlePresentModalPress}
      />
    );
  };

  const onShare = async (itemId: UUID | null, linkType: any) => {
    try {
      if (itemId === null) {
        throw new Error("No itemId");
      }
      const result = await Share.share({
        message: `Check out this on Graasp: ${
          linkType === SHARE_OPTIONS.COMPOSE
            ? `${SHARE_HOST.COMPOSE}/${itemId}`
            : `${SHARE_HOST.PERFORM}/${itemId}`
        }`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          setModalVisible({ toggle: false, itemId: null });
        } else {
          setModalVisible({ toggle: false, itemId: null });
        }
      } else if (result.action === Share.dismissedAction) {
        //setModalVisible({ toggle: false, itemId: null });
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDetailsPress = ({ itemId }: { itemId: UUID }) => {
    bottomSheetModalRef.current?.close();
    navigation.push('CommonStack', {
      screen: 'CommonStackDetail',
      params: { itemId },
    });
  };

  const handleSharePress = ({ itemId }: { itemId: UUID }) => {
    setModalVisible({ toggle: true, itemId });
  };

  return (
    <>
      <Overlay
        overlayStyle={styles.modalView}
        isVisible={modalVisible.toggle && modalVisible.itemId != null}
        onBackdropPress={() => setModalVisible({ toggle: false, itemId: null })}
      >
        <Button
          title="Perform"
          raised={true}
          buttonStyle={{ backgroundColor: '#5050d2' }}
          containerStyle={{ marginBottom: 20 }}
          onPress={async () => {
            await onShare(modalVisible.itemId, SHARE_OPTIONS.PERFORM);
          }}
        />
        <Divider />
        <Button
          title="Compose"
          raised={true}
          buttonStyle={{ backgroundColor: '#5050d2' }}
          onPress={async () => {
            await onShare(modalVisible.itemId, SHARE_OPTIONS.COMPOSE);
          }}
        />
      </Overlay>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        onRefresh={refresh}
        refreshing={isLoading}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<EmptyList />}
        ItemSeparatorComponent={() => (
          <Divider
            style={{ width: '90%', marginHorizontal: 10, marginBottom: 10 }}
          />
        )}
      />
    <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={({ animatedIndex, style: backDropStyle }) => (
          <CustomBackdrop
            animatedIndex={animatedIndex}
            style={backDropStyle}
            onBackDropPressed={() => bottomSheetModalRef.current?.close()}
          />
        )}
      >            
        { itemSelected && Boolean(itemSelected?.name) && (
          <>
            <ListItem style={{ paddingLeft: insets.left }} hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
              <ItemIcon
                type={itemSelected.type}
                extra={itemSelected.extra}
                name={itemSelected.name}
              />
              <ListItem.Content style={{ flexDirection: 'row' }}>
                <ListItem.Title style={{ flex: 2 }}>
                  {itemSelected.name}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <Divider
              style={{
                width: '100%',
                marginBottom: 10,
                marginLeft: insets.left,
              }}
            />
          </>
        )}
        { itemSelected && (
          <BottomSheetScrollView contentContainerStyle={null}>
            <ListItem
              onPress={() => handleDetailsPress({ itemId: itemSelected.id })}
              style={{ paddingLeft: insets.left }}
              hasTVPreferredFocus={undefined} 
              tvParallaxProperties={undefined}
            >
              <MaterialIcons name="info" size={24} color="grey" />
              <ListItem.Content style={{ flexDirection: 'row' }}>
                <ListItem.Title style={{ flex: 2 }}>Details</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem
              onPress={() => handleSharePress({ itemId: itemSelected.id })}
              style={{ paddingLeft: insets.left }}
              hasTVPreferredFocus={undefined} 
              tvParallaxProperties={undefined}
            >
              <MaterialIcons name="share" size={24} color="grey" />
              <ListItem.Content style={{ flexDirection: 'row' }}>
                <ListItem.Title style={{ flex: 2 }}>Share</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </BottomSheetScrollView>
        )}
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 6,
    margin: 6,
  },
  sectionHeaderContainer: {
    backgroundColor: 'white',
    padding: 6,
  },
  modalView: {
    justifyContent: 'center',
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default ItemsList;
