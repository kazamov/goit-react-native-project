import { FirebaseOptions, initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig: FirebaseOptions = {
    apiKey: 'AIzaSyCr0_03IqbNT46Mtf1TTegr_AwCeOXuGXw',
    authDomain: 'go-it-project-bc26f.firebaseapp.com',
    projectId: 'go-it-project-bc26f',
    storageBucket: 'go-it-project-bc26f.firebasestorage.app',
    messagingSenderId: '1073560485280',
    appId: '1:1073560485280:web:f4e3f535eb2d19ddc178c5',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
