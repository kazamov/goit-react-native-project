import { User } from './user';

export interface Comment {
    id: string;
    text: string;
    date: Date;
    authorId: User['uid'];
}
