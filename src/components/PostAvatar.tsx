import { View, Text, StyleSheet } from 'react-native';
import Avatar from './Avatar';
import { globalColorVariables } from '@/styles/variables';
import { useUserRef } from '@/hooks/useUserRef';

interface PostAvatarProps {
    authorId: string;
}

export default function PostAvatar({ authorId }: PostAvatarProps) {
    const { user } = useUserRef(authorId);
    return (
        <View style={{ flexDirection: 'row', gap: 8 }}>
            <Avatar size="normal" image={user?.photoURL ?? null} />
            <View style={{ justifyContent: 'center' }}>
                <Text style={styles.avatarName}>{user?.displayName ?? ''}</Text>
                <Text style={styles.avatarEmail}>{user?.email ?? ''}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    avatarName: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 13,
        lineHeight: 15,
        letterSpacing: 0,
        color: globalColorVariables.inputText,
    },
    avatarEmail: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 11,
        lineHeight: 13,
        letterSpacing: 0,
        color: 'rgba(33,33,33,0.8)',
    },
});
