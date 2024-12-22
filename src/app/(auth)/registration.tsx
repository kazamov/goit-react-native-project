import { Text, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';

import ActionButton from '@/components/ActionButton';
import PasswordInput from '@/components/PasswordInput';
import ProfileAvatarEdit from '@/components/ProfileAvatarEdit';
import TextButton from '@/components/TextButton';
import TextInput from '@/components/TextInput';
import FormField from '@/components/FormField';
import { validateEmailRFC3696 } from '@/utils/validators';
import { SignupParams } from '@/utils/auth';
import { useAuth } from '@/hooks/useAuth';
import { Fragment } from 'react';

type RegistrationFormState = SignupParams;

export default function RegistrationScreen() {
    const { control, handleSubmit } = useForm<RegistrationFormState>({
        defaultValues: {
            login: '',
            email: '',
            password: '',
        },
        mode: 'onSubmit',
    });
    const { signUp } = useAuth();

    const onSubmit = async (data: RegistrationFormState) => {
        try {
            await signUp(data);
        } catch (_error) {
            // TODO: handle error
        }
    };

    return (
        <Fragment>
            <View style={styles.profileContainer}>
                <ProfileAvatarEdit />
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.inputsContainer}>
                <Controller
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error, invalid },
                    }) => (
                        <FormField error={error}>
                            <TextInput
                                invalid={invalid}
                                value={value}
                                placeholder="Логін"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                variant="primary"
                            />
                        </FormField>
                    )}
                    name="login"
                    rules={{ required: "Це поле обов'язкове" }}
                />

                <Controller
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error, invalid },
                    }) => (
                        <FormField error={error}>
                            <TextInput
                                invalid={invalid}
                                value={value}
                                placeholder="Адреса електронної пошти"
                                keyboardType="email-address"
                                inputMode="email"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                variant="primary"
                            />
                        </FormField>
                    )}
                    name="email"
                    rules={{
                        required: "Це поле обов'язкове",
                        validate: (value) => {
                            const result = validateEmailRFC3696(value);
                            return (
                                result || 'Некоректна адреса електронної пошти'
                            );
                        },
                    }}
                />

                <Controller
                    control={control}
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error, invalid },
                    }) => (
                        <FormField error={error}>
                            <PasswordInput
                                invalid={invalid}
                                value={value}
                                placeholder="Пароль"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                variant="primary"
                            />
                        </FormField>
                    )}
                    name="password"
                    rules={{
                        required: "Це поле обов'язкове",
                        minLength: {
                            value: 8,
                            message:
                                'Пароль повинен містити мінімум 8 символів',
                        },
                    }}
                />
            </View>
            <View style={{ marginBlockEnd: 16 }}>
                <ActionButton
                    label="Зареєструватися"
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
            <View style={styles.switchScreenButtonContainer}>
                <TextButton
                    label="Вже є акаунт? Увійти"
                    onPress={() => {
                        router.push('/login');
                    }}
                />
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    inputsContainer: {
        rowGap: 16,
        marginBlockEnd: 43,
    },
    title: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 30,
        marginBlockStart: 60,
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
    switchScreenButtonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBlockEnd: 45,
    },
});
