import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
    getDownloadURL,
    ref,
    StorageReference,
    uploadBytes,
} from 'firebase/storage';

import { db, storage } from '@/firebase-config';
import { Post } from '@/models/post';
import { UserRef } from '@/models/user';

export const addUser = async (userId: string, userData: UserRef) => {
    try {
        await setDoc(doc(db, 'users', userId), userData, { merge: true });
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

export const addPost = async (userId: string, post: Post) => {
    try {
        await setDoc(
            doc(db, 'posts', userId),
            { userId, posts: [post] },
            { merge: true },
        );
    } catch (error) {
        console.error('Error adding post:', error);
    }
};

export const getUser = async (userId: string) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
};

export const getPosts = async (userId: string) => {
    const docRef = doc(db, 'posts', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
};

export const updateUser = async (uid: string, data: UserRef) => {
    try {
        await setDoc(doc(db, 'users', uid), data, { merge: true });
    } catch (error) {
        console.error('Error saving user data to Firestore:', error);
    }
};

export const uploadImage = async (
    userId: string,
    file: any,
    fileName: string,
) => {
    try {
        const imageRef = ref(storage, `profilePhotos/${userId}/${fileName}`);
        await uploadBytes(imageRef, file);
        return getImageUrl(imageRef);
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const getImageUrl = async (imageRef: StorageReference) => {
    const url = await getDownloadURL(imageRef);
    return url;
};
