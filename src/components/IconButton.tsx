import { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface IconButtonProps {
    children: ReactNode;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function IconButton({
    children,
    onPress,
    style,
}: IconButtonProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.iconButton,
                style,
                pressed && { opacity: 0.7 },
            ]}
            onPress={onPress}
        >
            {children}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        width: 25,
        height: 25,
    },
});
