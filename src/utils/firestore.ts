import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { db, storage } from '@/firebase-config';
import { Post } from '@/models/post';
import { User, UserRef } from '@/models/user';

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

export const uploadImageToStore = async (userId: User['uid'], uri: string) => {
    // Convert image to a Blob
    try {
        console.log('Fetch image');
        const response = await fetch(uri);
        console.log('Get image blob');
        const file = await response.blob();
        const fileName = uri.split('/').pop() as string;
        const fileType = file.type;

        console.log('Create ref');
        const imageRef = ref(storage, `profilePhotos/${userId}/${fileName}`);
        console.log('Upload image');
        const result = await uploadBytes(imageRef, file, {
            contentType: fileType,
        });

        console.log('Get image URL');
        const imageUrl = await getDownloadURL(imageRef);
        console.log('Upload result:', result);
        return imageUrl;
    } catch (error) {
        console.error('Error converting image to blob:', error);
        return null;
    }
};
