import { User } from './user';

export interface Comment {
    id: string;
    text: string;
    date: string;
    authorId: User['uid'];
}
