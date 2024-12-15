import {
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    StyleProp,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

import { globalColorVariables } from '@/styles/variables';
import { ReactNode, useMemo, useState } from 'react';

export type TextInputProps = Omit<RNTextInputProps, 'style'> & {
    invalid?: boolean;
    variant: 'primary' | 'secondary';
    iconLeft?: () => ReactNode;
    style?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
};

export default function TextInput({
    style,
    inputStyle,
    placeholderTextColor,
    invalid,
    variant,
    iconLeft,
    onFocus,
    onBlur,
    ...props
}: TextInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const iconLeftElement = useMemo(() => {
        if (!iconLeft) {
            return null;
        }

        return (
            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: [{ translateY: '-50%' }],
                    zIndex: 1,
                }}
            >
                {iconLeft()}
            </View>
        );
    }, [iconLeft]);

    return (
        <View style={[styles.container, style]}>
            {iconLeftElement}
            <RNTextInput
                {...props}
                style={[
                    styles.textInput,
                    variant === 'primary' && styles.primary,
                    variant === 'secondary' && styles.secondary,
                    iconLeft && { paddingInlineStart: 28 },
                    invalid && !isFocused && styles.invalid,
                    isFocused && styles.focused,
                    inputStyle,
                ]}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: '100%', height: 50, position: 'relative' },
    textInput: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: globalColorVariables.gray2,
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: 0,
        color: globalColorVariables.inputText,
    },
    primary: {
        backgroundColor: globalColorVariables.gray1,
        paddingInlineStart: 16,
        paddingInlineEnd: 16,
        paddingBlockStart: 16,
        paddingBlockEnd: 15,
        borderRadius: 8,
    },
    secondary: {
        borderWidth: 0,
        borderBottomWidth: 1,
        backgroundColor: globalColorVariables.white,
        paddingInlineStart: 0,
        paddingInlineEnd: 0,
        paddingBlockStart: 16,
        paddingBlockEnd: 15,
    },
    invalid: {
        borderColor: globalColorVariables.invalid,
    },
    focused: {
        backgroundColor: globalColorVariables.white,
        borderColor: globalColorVariables.primary,
    },
});
