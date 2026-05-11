import { Timestamp } from 'firebase/firestore';

export interface Band {
  id: string;
  name: string;
  city: string;
  style: string;
  bio: string;
  imageUrl: string;
  stats: {
    power: number;
    attitude: number;
    sound: number;
  };
}

export interface Vote {
  id: string;
  bandId: string;
  voterId: string;
  timestamp: Timestamp;
}

export interface GlobalSettings {
  isVotingOpen: boolean;
  eventTitle: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}
