import { Platform } from 'react-native';

import { UUID } from '@graasp/sdk';

export const APP_NAME = 'Graasp';

export const HELP_EMAIL = 'contact@graasp.org';

export const DEFAULT_IMAGE_SRC =
  'https://pbs.twimg.com/profile_images/1300707321262346240/IsQAyu7q_400x400.jpg';

export const ROOT_ID = 'root-id';

export const TREE_PREVENT_SELECTION = {
  NONE: 'none',
  SELF_AND_CHILDREN: 'selfAndChildren',
};

export const MIME_TYPES = {
  IMAGE: ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'],
  IMAGE_EXTENSIONS: ['png', 'jpg', 'gif', 'jpeg'],
  VIDEO: ['video/mp4', 'video/quicktime'],
  VIDEO_EXTENSIONS: ['mp4', 'mov'],
  AUDIO: ['audio/mpeg', 'audio/mp3'],
  AUDIO_EXTENSIONS: ['mp3', 'mp3'],
  PDF: ['application/pdf'],
  PDF_EXTENSIONS: ['pdf'],
};
export const MIME_TYPES_EXTENSIONS = {
  MIME_TYPES: [
    ...MIME_TYPES.IMAGE,
    ...MIME_TYPES.VIDEO,
    ...MIME_TYPES.AUDIO,
    ...MIME_TYPES.PDF,
  ],
  EXTENSIONS: [
    ...MIME_TYPES.IMAGE_EXTENSIONS,
    ...MIME_TYPES.VIDEO_EXTENSIONS,
    ...MIME_TYPES.AUDIO_EXTENSIONS,
    ...MIME_TYPES.PDF_EXTENSIONS,
  ],
};
export const DEFAULT_LOCALE = 'en-US';

export const ITEMS_TABLE_ROW_ICON_COLOR = '#333333';

export const USERNAME_MAX_LENGTH = 30;
export const HEADER_ITEM_NAME_MAX_LENGTH = 30;

export const LOADING_CONTENT = '…';

export const REDIRECT_URL_LOCAL_STORAGE_KEY = 'redirectUrl';

export const USER_ITEM_ORDER = 'user_order';

export const BUILDER_VIEW_SELECTION = 'builderViewSelection';
export const PLAYER_VIEW_SELECTION = 'playerViewSelection';

export const DRAG_ICON_SIZE = 18;

export const ACTION_CELL_WIDTH = 230;

export enum LOGIN_TYPE {
  EMAIL_LINK = 'emailLink',
  EMAIL_PASSWORD = 'emailPassword',
}

export enum SECURE_STORE_VALUES {
  AUTH_TOKEN = 'userToken',
  REFRESH_TOKEN = 'refreshToken',
  NONCE = 'nonce',
}

export enum AuthActionKind {
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export const SHARE_OPTIONS = {
  BUILDER: 1,
  PLAYER: 2,
};

export const SHARE_HOST = {
  BUILDER: 'https://builder.graasp.org/items',
  PLAYER: 'https://player.graasp.org',
};

export const VIEWS = {
  BUILDER: 'graasp_builder',
  PLAYER: 'graasp_player',
};

export const MEDIA_LIBRARY_PERMISSION_STATUS = {
  GRANTED: 'granted',
  DENIED: 'denied',
};

export const STATUS_CODES_OK = [200, 201, 202, 203, 204, 205, 206, 297];

export enum TEXT_ALIGNMENT {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  JUSTIFY = 'justify',
}

// Custom analytics events. Other events such as "login" are predefined events and are implemented using a predefined method.
export const ANALYTICS_EVENTS = {
  LOG_OUT: 'log_out',
  CREATE_FOLDER: 'create_folder',
  EDIT_ITEM: 'edit_item',
  DELETE_ITEM: 'delete_item',
  UPLOAD_ITEM: 'upload_item',
  SAVE_ITEM: 'save_item',
  SHARE_ITEM: 'share_item',
  SHARE_GRAASP_LINK: 'share_graasp_item_link',
  CHANGE_LANGUAGE: 'change_language',
  CHANGE_AVATAR: 'change_avatar',
  DELETE_MEMBER: 'delete_member',
};

export const PLATFORM_OS = {
  IOS: 'ios',
  ANDROID: 'android',
};

export const WEB_BROWSER_REDIRECT_RESULT_TYPE = 'success';

export const LOGIN_URI = {
  DEEP_LINK: {
    HOSTNAME: 'mobile.graasp.org',
    PATH: 'auth',
  },
  APP_SCHEME: {
    SCHEME: 'graasp-mobile',
    HOSTNAME: 'auth',
  },
};

// todo: move to sdk
export const buildSignUpPath = (
  { host }: { host: string },
  challenge?: string,
) => {
  const url = new URL(`${host}/signup`);
  if (challenge) {
    url.searchParams.set('m', challenge);
  }
  return url.toString();
};

// todo: use graasp ui?
export const PRIMARY_COLOR = '#5050d2';
export const PLAYER_COLOR = '#009eff';
export const CHAT_SELECTED_MESSAGE_COLOR = '#fc9607';
export const PRIMARY_LIGHT_COLOR = '#edeefb';

export const MENTION_REGEX =
  /<!@(?<id>[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12})>\[.*\]$/i;
export const MENTION_REGEX_WITH_NAME =
  /<!@(?<id>[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12})>\[(?<name>[^\]]*)\]/gi;
export const buildChatMentionRegex = (id: UUID, name: string) =>
  `\`<!@${id}>[${name}]\``;

export const MENTION_CHAT_TRIGGER = '@';
export const UNKNOWN_CHAT_MEMBER = 'Unknown';

export const BOTTOM_SNAP_POINTS_CHAT = ['20%', '40%'];
export const BOTTOM_SNAP_POINTS_ADD_ITEM = ['25%', '50%'];
export const BOTTOM_SNAP_POINTS_ITEM_LIST = ['55%', '60%', '90%'];
export const BOTTOM_SNAP_POINTS_PLAYER = ['40%', '95%'];
export const BOTTOM_SNAP_POINTS_PROFILE = ['25%', '50%'];
export const BOTTOM_SNAP_POINTS_SEARCH_FILTER = ['90%'];

export const CHAT_MAX_LENGTH = 400;
export const CHAT_WIDTH_IMAGE_MESSAGE = 0.65;

// platform dependent value to allow correct automatic title truncation when defining headerRight in ItemStack
// align center does not work well in android https://github.com/software-mansion/react-native-screens/issues/1573
export const HEADER_TITLE_ALIGN_FOR_TRUNCATION: 'center' | 'left' =
  Platform.select({
    // width is acting weird with align left
    ios: 'center',
    // truncation does not work well with center align
    android: 'left',
  }) ?? 'center';
