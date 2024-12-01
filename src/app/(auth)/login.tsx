import { Text, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import ActionButton from '@/components/ActionButton';
import PasswordInput from '@/components/PasswordInput';
import TextButton from '@/components/TextButton';
import TextInput from '@/components/TextInput';
import { Controller, useForm } from 'react-hook-form';
import FormField from '@/components/FormField';

interface LoginFormState {
    email: string;
    password: string;
}

export default function LoginScreen() {
    const { control, handleSubmit } = useForm<LoginFormState>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onSubmit',
    });

    const onSubmit = (data: LoginFormState) => {
        console.log(data);
    };

    return (
        <>
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
        </>
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
