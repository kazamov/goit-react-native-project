import { LocationObject } from 'expo-location';

import { User } from 'firebase/auth';

export interface Post {
    id: string;
    location: LocationObject;
    photo: string;
    title: string;
    place: string;
    commentsCount: number;
    likes: number;
    authorId: User['uid'];
}
