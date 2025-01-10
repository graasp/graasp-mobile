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

type IndexMember = {
  id: string;
  name: string;
};

export type IndexItem = {
  id: string;
  name: string;
  creator: IndexMember;
  description: string;
  type: any;
  content: string;
  isPublishedRoot: boolean;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
  lang: string;
  likes: number;
} & { [key in TagCategory]: string[] };
