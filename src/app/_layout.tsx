import {
    useFonts,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { PostsProvider } from '@/contexts/PostsContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Roboto_300Light,
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
    });

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (loaded || error || isAuthenticated !== null) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error, isAuthenticated]);

    if (!loaded && !error) {
        return null;
    }

    if (isAuthenticated === null) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <AuthProvider>
                <PostsProvider>
                    <Slot />
                </PostsProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}
