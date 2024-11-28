import {
    Pressable,
    Text,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { globalColorVariables } from '@/styles/variables';

interface TextButtonProps {
    label: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function TextButton({ label, onPress, style }: TextButtonProps) {
    return (
        <Pressable style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {},
    buttonText: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: 0,
        color: globalColorVariables.textButton,
    },
});
