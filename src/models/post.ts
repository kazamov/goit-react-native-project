import { LocationObject } from 'expo-location';

import { Comment } from './comment';
import { User } from 'firebase/auth';

export interface Post {
    id: string;
    location: LocationObject;
    photo: string;
    title: string;
    place: string;
    comments: Comment[];
    likes: number;
    authorId: User['uid'];
}
