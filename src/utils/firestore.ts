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
    Timestamp,
    increment,
    updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { db, storage } from '@/firebase-config';
import { Post } from '@/models/post';
import { User, UserRef } from '@/models/user';
import { Comment } from '@/models/comment';

export const addUser = async (userId: string, userData: UserRef) => {
    try {
        await setDoc(doc(db, 'users', userId), userData, { merge: true });
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

function formatDateToCustomFormat(date: Date): string {
    // Define options for formatting the date
    const dateOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    };

    // Define options for formatting the time
    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    };

    // Format date and time separately
    const formattedDate = new Intl.DateTimeFormat('uk-UA', dateOptions).format(
        date,
    );
    const formattedTime = new Intl.DateTimeFormat('uk-UA', timeOptions).format(
        date,
    );

    // Combine date and time with the separator
    return `${formattedDate} | ${formattedTime}`;
}

export const addPost = async (post: Post) => {
    try {
        // Add a new document with a generated id.
        await addDoc(collection(db, 'posts'), post);
    } catch (error) {
        console.error('Error adding post:', error);
    }
};

export const addComment = async (postId: string, comment: Comment) => {
    try {
        // Add a new document with a generated id.
        const dateCreated = Timestamp.now();
        await addDoc(collection(db, 'posts', postId, 'comments'), {
            ...comment,
            dateCreated,
        });
        await updateDoc(doc(db, 'posts', postId), {
            commentsCount: increment(1),
        });

        return {
            ...comment,
            date: formatDateToCustomFormat(dateCreated.toDate()),
        } as Comment;
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};

export const getComments = async (postId: string) => {
    const collectionRef = collection(db, 'posts', postId, 'comments');

    const querySnapshot = await getDocs(
        query(collectionRef, orderBy('dateCreated')),
    );
    return querySnapshot.docs.map((doc) => {
        const { dateCreated, ...comment } = doc.data();
        const t = new Timestamp(dateCreated.seconds, dateCreated.nanoseconds);

        return {
            ...comment,
            id: doc.id,
            date: formatDateToCustomFormat(t.toDate()),
        } as Comment;
    });
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
