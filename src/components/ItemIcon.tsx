import { Image } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { MaterialIcons } from '@expo/vector-icons';

import {
  DiscriminatedItem,
  EmbeddedLinkItemExtra,
  ItemType,
  LocalFileItemExtra,
  MimeTypes,
  getEmbeddedLinkExtra,
} from '@graasp/sdk';

import { ITEMS_TABLE_ROW_ICON_COLOR } from '../config/constants/constants';

interface ItemIconProps {
  type: DiscriminatedItem['type'];
  extra: DiscriminatedItem['extra'];
  size?: number;
  style?: any;
}

const ItemIcon = ({
  type,
  extra,
  size = 20,
  style,
}: ItemIconProps): JSX.Element => {
  if (type === ItemType.LINK) {
    const icon = getEmbeddedLinkExtra(extra as EmbeddedLinkItemExtra)
      ?.icons?.[0];

    if (icon) {
      const isSvg = new RegExp(/\.svg$/i);
      if (isSvg.test(icon)) {
        return <SvgUri width={20} height={20} uri={icon} />;
      }

      return <Image style={{ width: 20, height: 20 }} source={{ uri: icon }} />;
    }
  }

  enum icons {
    INSERT_DRIVE_FILE = 'insert-drive-file',
    FOLDER = 'folder',
    IMAGE = 'image',
    MOVIE = 'movie',
    MUSIC_NOTE = 'music-note',
    PICTURE_AS_PDF = 'picture-as-pdf',
    INSERT_LINK = 'insert-link',
    APPS = 'apps',
    DESCRIPTION = 'description',
  }

  let Icon = icons.INSERT_DRIVE_FILE;
  switch (type) {
    case ItemType.FOLDER:
      Icon = icons.FOLDER;
      break;
    case ItemType.LOCAL_FILE: {
      const mimetype = (extra as LocalFileItemExtra).file.mimetype;
      if (MimeTypes.isImage(mimetype)) {
        Icon = icons.IMAGE;
        break;
      }
      if (MimeTypes.isVideo(mimetype)) {
        Icon = icons.MOVIE;
        break;
      }
      if (MimeTypes.isAudio(mimetype)) {
        Icon = icons.MUSIC_NOTE;
        break;
      }
      if (MimeTypes.isPdf(mimetype)) {
        Icon = icons.PICTURE_AS_PDF;
        break;
      }
      Icon = icons.INSERT_DRIVE_FILE;
      break;
    }
    case ItemType.LINK: {
      Icon = icons.INSERT_LINK;
      break;
    }
    case ItemType.APP: {
      Icon = icons.APPS;
      break;
    }
    case ItemType.DOCUMENT: {
      Icon = icons.DESCRIPTION;
      break;
    }
    default:
      break;
  }
  return (
    <MaterialIcons
      name={Icon}
      color={ITEMS_TABLE_ROW_ICON_COLOR}
      size={size}
      style={style}
    />
  );
};

export default ItemIcon;
