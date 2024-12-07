import {
    StyleSheet,
    KeyboardAvoidingView,
    Pressable,
    Keyboard,
    Platform,
    ImageBackground,
} from 'react-native';
import { Slot, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalColorVariables } from '@/styles/variables';

import AuthBackgroundImg from '../../../assets/auth-background.jpg';

export default function AuthLayout() {
    const pathname = usePathname();

    return (
        <Pressable style={styles.screen} onPress={Keyboard.dismiss}>
            <ImageBackground
                source={AuthBackgroundImg}
                style={styles.screenBackgroundImage}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoidingContainer}
                    keyboardVerticalOffset={
                        pathname === '/registration' ? -180 : -240
                    }
                >
                    <SafeAreaView
                        style={styles.contentContainer}
                        edges={['bottom']}
                    >
                        <Slot />
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    keyboardAvoidingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    screenBackgroundImage: {
        flex: 1,
    },
    contentContainer: {
        height: 'auto',
        width: '100%',
        backgroundColor: globalColorVariables.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 32,
        position: 'relative',
    },
});
