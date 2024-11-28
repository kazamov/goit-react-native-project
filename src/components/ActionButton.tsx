import { globalColorVariables } from '@/styles/variables';
import { StyleSheet, Pressable, Text } from 'react-native';

interface ButtonProps {
    label: string;
    onPress: () => void;
}

export default function Button({ label, onPress }: ButtonProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed && { opacity: 0.8 },
            ]}
            onPress={onPress}
        >
            <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        width: '100%',
        height: 51,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: globalColorVariables.primary,
    },
    buttonLabel: {
        color: globalColorVariables.white,
        fontSize: 16,
        fontFamily: 'Roboto_400Regular',
        letterSpacing: 0,
        lineHeight: 19,
    },
});
