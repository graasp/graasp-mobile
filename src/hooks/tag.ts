// info: copied logic from query-client since we cannot update the dependencies
import { useQuery } from 'react-query';

import { UUID } from '@graasp/sdk';

import axios from 'axios';

import { API_HOST } from '../config/env';
import { Tag } from '../config/types';

export const buildGetTagsByItemRoute = ({ itemId }: { itemId: UUID }) => {
  return `${API_HOST}/items/${itemId}/tags`;
};

export const getTagsByItem = async (args: any) => {
  return axios
    .get<Tag[]>(`${API_HOST}/${buildGetTagsByItemRoute(args)}`)
    .then(({ data }) => data);
};

export const useTagsByItem = ({ itemId }: { itemId: UUID }) => {
  return useQuery({
    queryKey: ['items', itemId, 'tags'],
    queryFn: () => {
      if (!itemId) {
        console.error('error on getting tags');
      }
      return getTagsByItem({ itemId });
    },
    enabled: Boolean(itemId),
  });
};
