import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Pressable,
    Keyboard,
    Platform,
    ImageBackground,
} from 'react-native';

import { globalColorVariables } from '@/styles/variables';
import TextInput from '@/components/TextInput';
import ActionButton from '@/components/ActionButton';
import TextButton from '@/components/TextButton';
import PasswordInput from '@/components/PasswordInput';
import ProfileAvatarEdit from '@/components/ProfileAvatarEdit';

import AuthBackgroundImg from '../../assets/auth-background.jpg';

interface RegistrationFormState {
    login: string;
    email: string;
    password: string;
}

export default function RegistrationScreen() {
    const [registrationFormState, setRegistrationFormState] =
        useState<RegistrationFormState>({
            login: '',
            email: '',
            password: '',
        });

    const createInputHandler = (fieldName: keyof RegistrationFormState) => {
        return (value: string) => {
            setRegistrationFormState((prevState) => ({
                ...prevState,
                [fieldName]: value,
            }));
        };
    };

    return (
        <Pressable style={styles.screen} onPress={Keyboard.dismiss}>
            <ImageBackground
                source={AuthBackgroundImg}
                style={styles.screenBackgroundImage}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoidingContainer}
                    keyboardVerticalOffset={-180}
                >
                    <View style={styles.contentContainer}>
                        <View style={styles.profileContainer}>
                            <ProfileAvatarEdit />
                        </View>
                        <Text style={styles.title}>Реєстрація</Text>
                        <View style={styles.inputsContainer}>
                            <TextInput
                                value={registrationFormState.login}
                                placeholder="Логін"
                                onChangeText={createInputHandler('login')}
                            />
                            <TextInput
                                value={registrationFormState.email}
                                placeholder="Адреса електронної пошти"
                                onChangeText={createInputHandler('email')}
                                keyboardType="email-address"
                                inputMode="email"
                            />
                            <PasswordInput
                                value={registrationFormState.password}
                                placeholder="Пароль"
                                onChangeText={createInputHandler('password')}
                            />
                        </View>
                        <View style={{ marginBlockEnd: 16 }}>
                            <ActionButton
                                label="Зареєструватися"
                                onPress={() => alert('Зареєструвати аккаунт')}
                            />
                        </View>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <TextButton
                                label="Вже є акаунт? Увійти"
                                onPress={() => {
                                    alert('Вхід в аккаунт');
                                }}
                            />
                        </View>
                    </View>
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
        height: 549,
        width: '100%',
        backgroundColor: globalColorVariables.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingInlineStart: 16,
        paddingInlineEnd: 16,
        paddingBlockStart: 92,
        position: 'relative',
    },
    inputsContainer: {
        rowGap: 16,
        marginBlockEnd: 43,
    },
    title: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 30,
        marginBlockEnd: 32,
        textAlign: 'center',
        letterSpacing: 0.16,
        lineHeight: 35,
    },
    profileContainer: {
        position: 'absolute',
        height: 'auto',
        top: 0,
        left: 0,
        right: 0,
        transform: [{ translateY: '-50%' }],
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
