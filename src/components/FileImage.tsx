import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';

import { DiscriminatedItem } from '@graasp/sdk';

import { useNavigation } from '@react-navigation/native';

import {
  IMAGE_ITEM,
  IMAGE_SAVE,
  IMAGE_SHARE,
} from '../../e2e/constants/testIds';
import { ANALYTICS_EVENTS } from '../config/constants/constants';
import { ItemScreenProps } from '../navigation/types';
import { customAnalyticsEvent } from '../utils/functions/analytics';
import { saveMedia } from '../utils/functions/media';
import ChatButton from './common/ChatButton';
import FileHeaderButton from './common/FileHederButton';

interface FileImageProps {
  filePath: string;
  handleShareFile: () => Promise<void>;
  mimetype: string;
  isPlayerView: boolean;
  item: DiscriminatedItem;
}

const FileImage: FC<FileImageProps> = ({
  filePath,
  handleShareFile,
  mimetype,
  isPlayerView,
  item,
}) => {
  const dimensions = useWindowDimensions();
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  }>({ width: dimensions.width, height: dimensions.height });
  const navigation =
    useNavigation<ItemScreenProps<'ItemStackItem'>['navigation']>();
  const { t } = useTranslation();

  useEffect(() => {
    Image.getSize(
      filePath,
      (width, height) => {
        setImageSize({ width, height });
      },
      (error) => {
        console.error('error getting the image size', error);
      },
    );
  }, []);

  useEffect(() => {
    if (!isPlayerView) {
      navigation.setOptions({
        headerTitleAlign: 'left',
        // move to headerBackTitle: ' ' when we have only 2 buttons
        // corresponds to the max space available for title on the left and 3 buttons on the right
        headerTitleContainerStyle: { maxWidth: '50%' },
        headerBackTitleVisible: false,
        headerRight: () => (
          <View style={styles.headerButtons}>
            <ChatButton item={item} />
            <FileHeaderButton
              name="save-alt"
              handler={handleSaveImage}
              testID={IMAGE_SAVE}
            />
            <FileHeaderButton
              name="ios-share"
              handler={handleShareFile}
              testID={IMAGE_SHARE}
            />
          </View>
        ),
      });
    }
  }, [isPlayerView]);

  const handleSaveImage = async () => {
    saveMedia(filePath, t);
    await customAnalyticsEvent(ANALYTICS_EVENTS.SAVE_ITEM, {
      item_type: mimetype,
    });
  };

  const width =
    imageSize.width > dimensions.width ? dimensions.width : imageSize.width;
  return (
    <View style={styles.imageContainer}>
      <Image
        resizeMode="contain"
        style={{
          width,
          height: (imageSize.height / imageSize.width) * width,
        }}
        source={{
          uri: filePath,
        }}
        testID={IMAGE_ITEM}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: 'row',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default FileImage;
