import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { usePosts } from '@/contexts/PostsContext';
import Avatar from '@/components/Avatar';
import PostCard from '@/components/PostCard';
import { globalColorVariables } from '@/styles/variables';
import { Post } from '@/models/post';

import { useUser } from '@/hooks/useUser';

export default function PostsScreen() {
    const user = useUser();
    const { posts } = usePosts();

    const handleCommentsPress = (postId: string) => {
        router.push({ pathname: '/comments', params: { postId } });
    };

    const handlePlacePress = (postId: Post['id']) => {
        router.push({
            pathname: '/map',
            params: {
                postId,
            },
        });
    };

    if (!user) {
        return null;
    }

    return (
        <View style={styles.screen}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <Avatar size="normal" image={user.photoURL} />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.avatarName}>{user.displayName}</Text>
                    <Text style={styles.avatarEmail}>{user.email}</Text>
                </View>
            </View>

            {posts.length > 0 &&
                posts.map((post) => (
                    <PostCard
                        key={post.id}
                        model={post}
                        onCommentsPress={handleCommentsPress}
                        onPlacePress={handlePlacePress}
                    />
                ))}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingBlock: 32,
        paddingInline: 16,
        gap: 32,
    },
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
