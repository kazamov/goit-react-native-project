import { CameraCapturedPicture } from 'expo-camera';
import { LocationObject } from 'expo-location';

import { Comment } from './comment';

export interface Post {
    id: string;
    location: LocationObject;
    photo: CameraCapturedPicture;
    title: string;
    place: string;
    comments: Comment[];
    likes: number;
}
