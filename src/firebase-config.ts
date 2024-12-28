import { FirebaseOptions, initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig: FirebaseOptions = {
    apiKey: 'AIzaSyBP4LBL27Ghv66U04EmkyGc0kF1jy9vrWg',
    authDomain: 'go-it-project-cf27c.firebaseapp.com',
    projectId: 'go-it-project-cf27c',
    storageBucket: 'go-it-project-cf27c.firebasestorage.app',
    messagingSenderId: '126921498286',
    appId: '1:126921498286:web:fb5f037c979a39f5ecd73f',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
