import { StyleSheet, View } from 'react-native';

import TextInput, { TextInputProps } from './TextInput';
import { useState } from 'react';
import TextButton from './TextButton';

export default function PasswordInput({ style, ...props }: TextInputProps) {
    const [isSecure, setIsSecure] = useState(true);

    return (
        <View style={styles.inputContainer}>
            <TextInput
                {...props}
                secureTextEntry={isSecure}
                style={[styles.input, style]}
            />
            <TextButton
                label={isSecure ? 'Показати' : 'Сховати'}
                onPress={() => setIsSecure((prevState) => !prevState)}
                style={styles.textButton}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        position: 'relative',
    },
    input: {
        paddingInlineEnd: 90,
    },
    textButton: {
        position: 'absolute',
        right: 16,
        top: '50%',
        transform: [{ translateY: '-50%' }],
    },
});
