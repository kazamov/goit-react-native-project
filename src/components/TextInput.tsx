import {
    TextInput as RNTextInput,
    TextInputProps,
    StyleSheet,
} from 'react-native';

import { globalColorVariables } from '@/styles/variables';
import { useState } from 'react';

export default function TextInput({
    style,
    placeholderTextColor,
    onFocus,
    onBlur,
    ...props
}: TextInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <RNTextInput
            {...props}
            style={[styles.textInput, style, isFocused && styles.focused]}
            placeholderTextColor={
                placeholderTextColor ?? globalColorVariables.gray3
            }
            onFocus={(e) => {
                setIsFocused(true);
                onFocus?.(e);
            }}
            onBlur={(e) => {
                setIsFocused(false);
                onBlur?.(e);
            }}
        />
    );
}

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        height: 50,
        backgroundColor: globalColorVariables.gray1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: globalColorVariables.gray2,
        paddingInlineStart: 16,
        paddingInlineEnd: 16,
        paddingBlockStart: 16,
        paddingBlockEnd: 15,
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: 0,
        color: globalColorVariables.inputText,
    },
    focused: {
        backgroundColor: globalColorVariables.white,
        borderColor: globalColorVariables.primary,
    },
});
