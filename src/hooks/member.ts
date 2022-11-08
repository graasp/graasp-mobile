import { useQuery } from 'react-query';

import { UUID } from '../types';
import { getUserToken } from '../utils/functions/token';
import { buildMemberKey } from './utils';

export const useMember = (
  id: UUID,
  { enabled = true }: { enabled?: boolean } = {},
) => {
  const userToken: any = getUserToken();

  return useQuery({
    ...buildMemberKey(id, userToken, enabled),
    retry: false,
  });
};
