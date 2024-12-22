import { UserRef } from './user';

export interface Comment {
    id: string;
    text: string;
    date: Date;
    author: UserRef;
}
