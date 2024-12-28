import { StyleSheet, View, SectionList } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import PostCard from '@/components/PostCard';
import { Post } from '@/models/post';

import { usePosts } from '@/hooks/usePosts';
import { useCallback, useMemo } from 'react';
import PostAvatar from '@/components/PostAvatar';

export default function PostsScreen() {
    const { posts, fetchPosts } = usePosts();

    const groupedPosts = useMemo(() => {
        if (!posts) {
            return [];
        }

        const grouped: Record<string, Post[]> = {};

        for (const item of posts) {
            const key = item.authorId;
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(item);
        }

        return Object.entries(grouped).map(([authorId, data]) => ({
            authorId,
            data,
        }));
    }, [posts]);

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

    useFocusEffect(
        useCallback(() => {
            fetchPosts();
        }, [fetchPosts]),
    );

    return (
        <View style={styles.screen}>
            {posts && posts.length > 0 && (
                <SectionList
                    sections={groupedPosts}
                    renderItem={({ item }) => (
                        <PostCard
                            key={item.id}
                            model={item}
                            onCommentsPress={handleCommentsPress}
                            onPlacePress={handlePlacePress}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    renderSectionHeader={({ section: { authorId } }) => (
                        <View style={styles.sectionHeader}>
                            <PostAvatar authorId={authorId} />
                        </View>
                    )}
                    style={{ borderRadius: 8 }}
                />
            )}
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
    sectionHeader: {
        paddingBlockStart: 16,
        paddingBlockEnd: 32,
        backgroundColor: `rgba(255, 255, 255, 0.7)`,
        borderRadius: 8,
    },
});
