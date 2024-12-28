import {
    doc,
    getDoc,
    setDoc,
    collection,
    query,
    getDocs,
    orderBy,
    limit,
    addDoc,
} from 'firebase/firestore';
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
        // Add a new document with a generated id.
        await addDoc(collection(db, 'posts'), post);
    } catch (error) {
        console.error('Error adding post:', error);
    }
};

export const getUser = async (userId: string): Promise<UserRef | null> => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as UserRef;
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

export const getAllPosts = async () => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, orderBy('authorId'), limit(30));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as Post;
    });
};

export const updateUser = async (uid: string, data: UserRef) => {
    try {
        await setDoc(doc(db, 'users', uid), data, { merge: true });
    } catch (error) {
        console.error('Error saving user data to Firestore:', error);
    }
};

export const uploadImageToStore = async (
    folder: string,
    userId: User['uid'],
    uri: string,
) => {
    // Convert image to a Blob
    try {
        const response = await fetch(uri);
        const file = await response.blob();
        const fileName = uri.split('/').pop() as string;
        const fileType = file.type;

        const imageRef = ref(storage, `${folder}/${userId}/${fileName}`);
        await uploadBytes(imageRef, file, {
            contentType: fileType,
        });

        return getDownloadURL(imageRef);
    } catch (error) {
        console.error('Error when uploading image to the store:', error);
        return null;
    }
};
