import { validate as uuidValidate } from 'uuid';

import {
  BUILDER_HOST,
  LIBRARY_HOST,
  PLAYER_HOST,
  SHORT_HOST,
} from '../../config/env';

export const ID_FORMAT = '(?=.*[0-9])(?=.*[a-zA-Z])([a-z0-9-]+)';

export const getItemIdFromUrl = (url: string): string | null => {
  try {
    const obj = new URL(url);
    // validate host
    if (
      ![BUILDER_HOST, PLAYER_HOST, LIBRARY_HOST, SHORT_HOST].some((host) =>
        host.includes(obj.hostname),
      )
    ) {
      alert('url is not a graasp link');
      return null;
    }

    if (SHORT_HOST.includes(obj.hostname)) {
      // todo: handle short links
    }

    // this works as long as there is only one id in the url!
    const match = /((\w{4,12}-?)){5}/.exec(url);

    if (!match?.length || !uuidValidate(match[0])) {
      throw new Error(match?.[0]);
    }

    return match[0];
  } catch (e) {
    console.error(e);
    alert('url is malformed');
    return null;
  }
};
