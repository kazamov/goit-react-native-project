import 'react-native-gesture-handler';
import {
    useFonts,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { ReactNode, useEffect } from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Text } from 'react-native';

import store from '@/redux/store/store';
import { PostsProvider } from '@/contexts/PostsContext';
import { useAuthStateChange } from '@/hooks/useAuth';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Roboto_300Light,
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <Provider store={store.store}>
            <PersistGate
                loading={<Text>Loading...</Text>}
                persistor={store.persistor}
            >
                <SafeAreaProvider>
                    <PostsProvider>
                        <AuthListener>
                            <Slot />
                        </AuthListener>
                    </PostsProvider>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}

function AuthListener({ children }: { children: ReactNode }) {
    useAuthStateChange();
    return children;
}
