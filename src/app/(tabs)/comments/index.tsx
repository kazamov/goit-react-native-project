import CommentCard from '@/components/CommentCard';
import TextInput from '@/components/TextInput';
import { usePosts } from '@/contexts/PostsContext';
import ArrowLeft from '@/icons/ArrowLeft';
import ArrowUpIcon from '@/icons/ArrowUp';
import { Post } from '@/models/post';
import { globalColorVariables } from '@/styles/variables';
import {
    router,
    Stack,
    useFocusEffect,
    useLocalSearchParams,
} from 'expo-router';
import { useCallback, useState } from 'react';
import {
    Pressable,
    View,
    StyleSheet,
    Image,
    Text,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CommentsScreen() {
    const { postId } = useLocalSearchParams();
    const { posts } = usePosts();
    const [comment, setComment] = useState('');

    const post = posts.find((post) => post.id === postId) as Post;

    const handleCommentSubmit = useCallback(() => {
        console.log('Comment submitted:', comment);
        setComment('');
    }, [comment]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setComment('');
            };
        }, []),
    );

    return (
        <View style={styles.screen}>
            <Stack.Screen
                options={{
                    title: 'Коментарі',
                    headerShown: true,
                    headerLeft: () => {
                        return (
                            <Pressable onPress={() => router.back()}>
                                <ArrowLeft />
                            </Pressable>
                        );
                    },
                    headerTitleAlign: 'center',
                }}
            />
            <Image source={post.photo} style={styles.photo} />
            <ScrollView style={styles.commentsContainer}>
                {post.comments.length > 0 ? (
                    post.comments.map((comment) => {
                        return (
                            <CommentCard
                                key={comment.id}
                                model={comment}
                                avatarPosition="left"
                            />
                        );
                    })
                ) : (
                    <View>
                        <Text>Ще немає коментарів</Text>
                    </View>
                )}
            </ScrollView>
            <SafeAreaView edges={['bottom']} style={{ position: 'relative' }}>
                <View>
                    <TextInput
                        value={comment}
                        onChangeText={(text) => setComment(text)}
                        variant="primary"
                        placeholder="Коментувати..."
                        inputStyle={{ borderRadius: 100, paddingInlineEnd: 50 }}
                    />
                    <Pressable
                        style={({ pressed }) => [
                            styles.pushCommentButton,
                            pressed && { opacity: 0.8 },
                        ]}
                        onPress={handleCommentSubmit}
                    >
                        <ArrowUpIcon />
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 16,
        paddingBlockStart: 32,
        backgroundColor: globalColorVariables.white,
    },
    photo: {
        width: '100%',
        height: 240,
        borderRadius: 8,
        marginBlockEnd: 32,
    },
    commentsContainer: {
        gap: 24,
        flex: 1,
    },
    pushCommentButton: {
        width: 34,
        height: 34,
        backgroundColor: globalColorVariables.primary,
        borderRadius: 100,
        position: 'absolute',
        right: 8,
        top: '50%',
        transform: [{ translateY: '-50%' }],
        justifyContent: 'center',
        alignItems: 'center',
    },
});
