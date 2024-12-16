import { IMessage } from 'react-native-gifted-chat';

import { UUID } from '@graasp/sdk';

export interface GiftedChatMessage extends Omit<IMessage, '_id'> {
  _id: string;
}

// copied types because cannot update dependencies
export enum TagCategory {
  Level = 'level',
  Discipline = 'discipline',
  ResourceType = 'resource-type',
}

export type Tag = { id: UUID; name: string; category: TagCategory };
