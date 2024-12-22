import { auth } from '@/firebase-config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as fbSignOut,
    updateProfile,
    User as FbUser,
} from 'firebase/auth';
import { User, UserRef } from '@/models/user';

import { addUser } from './firestore';

export interface SignupParams {
    email: string;
    password: string;
    login: string;
    photoURL: string;
}

export interface SigninParams {
    email: string;
    password: string;
}

export const signUp = async ({
    email,
    password,
    login,
}: SignupParams): Promise<void> => {
    try {
        const credentials = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );
        const user = credentials.user;

        await Promise.all([
            updateProfile(user, {
                displayName: login,
            }),
            addUser(user.uid, {
                uid: user.uid,
            } satisfies UserRef),
        ]);
    } catch (error) {
        console.log('Signup error:', error);
        throw error;
    }
};

export const signIn = async ({
    email,
    password,
}: SigninParams): Promise<User> => {
    try {
        const credentials = await signInWithEmailAndPassword(
            auth,
            email,
            password,
        );
        return transformFbUser(credentials.user);
    } catch (error) {
        console.error('Signin error', error);
        throw error;
    }
};

export const signOut = async () => {
    try {
        await fbSignOut(auth);
    } catch (error) {
        console.error('Signout error:', error);
        throw error;
    }
};

export const updateUserProfile = async (update: {
    displayName?: string | null;
    photoURL?: string | null;
}) => {
    const user = auth.currentUser;
    if (user) {
        await updateProfile(user, update);
    }
};

export function transformFbUser(user: FbUser): User {
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
    };
}
