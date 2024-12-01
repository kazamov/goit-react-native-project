import { globalColorVariables } from '@/styles/variables';
import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { View, StyleSheet, Text } from 'react-native';

interface FormFieldProps {
    children: ReactNode;
    error?: FieldError;
}

export default function FormField({ children, error }: FormFieldProps) {
    return (
        <View style={styles.field}>
            {children}
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    field: {
        gap: 4,
    },
    errorMessage: {
        color: globalColorVariables.invalid,
        fontSize: 12,
        marginInlineStart: 16,
    },
});
