import { Text, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';

import ActionButton from '@/components/ActionButton';
import PasswordInput from '@/components/PasswordInput';
import TextButton from '@/components/TextButton';
import TextInput from '@/components/TextInput';
import FormField from '@/components/FormField';
import { useAuth } from '@/hooks/useAuth';
import { SigninParams } from '@/utils/auth';
import { Fragment } from 'react';

type LoginFormState = SigninParams;

export default function LoginScreen() {
    const { control, handleSubmit } = useForm<LoginFormState>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onSubmit',
    });

    const { signIn } = useAuth();

    const onSubmit = async (data: LoginFormState) => {
        try {
            await signIn(data);
        } catch (_error) {
            // TODO: handle error
        }
    };

    return (
        <Fragment>
            <Text style={styles.title}>Увійти</Text>
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
                                placeholder="Адреса електронної пошти"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                variant="primary"
                            />
                        </FormField>
                    )}
                    name="email"
                    rules={{ required: "Це поле обов'язкове" }}
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
                    rules={{ required: "Це поле обов'язкове" }}
                />
            </View>
            <View style={{ marginBlockEnd: 16 }}>
                <ActionButton label="Увійти" onPress={handleSubmit(onSubmit)} />
            </View>
            <View style={styles.switchScreenButtonContainer}>
                <TextButton
                    label="Немає аккаунту? Зареєструватися"
                    onPress={() => {
                        router.push('/registration');
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
        marginBlockEnd: 32,
        textAlign: 'center',
        letterSpacing: 0.16,
        lineHeight: 35,
    },
    switchScreenButtonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBlockEnd: 111,
    },
});
