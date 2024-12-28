import CommentCard from '@/components/CommentCard';
import TextInput from '@/components/TextInput';
import { useUser } from '@/hooks/useUser';
import ArrowLeft from '@/icons/ArrowLeft';
import ArrowUpIcon from '@/icons/ArrowUp';
import { Comment } from '@/models/comment';
import { globalColorVariables } from '@/styles/variables';
import {
    router,
    Stack,
    useFocusEffect,
    useLocalSearchParams,
} from 'expo-router';
import { useCallback, useState, Fragment } from 'react';
import {
    Pressable,
    View,
    StyleSheet,
    Image,
    Text,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useComments } from '@/hooks/useComments';
import { useSelector } from 'react-redux';
import { PostsSlice, selectPost } from '@/redux/reducers/posts-slice';

export default function CommentsScreen() {
    const [comment, setComment] = useState('');

    const { postId } = useLocalSearchParams();
    const user = useUser();
    const post = useSelector((state) =>
        selectPost(state as { posts: PostsSlice }, postId as string),
    );
    const { comments, fetchComments, addComment } = useComments(
        postId as string,
    );

    const handleCommentSubmit = useCallback(() => {
        addComment(
            postId as string,
            {
                authorId: user?.uid as string,
                text: comment,
                id: Date.now().toString(),
            } as Comment,
        ).then(() => {
            setComment('');
        });
    }, [addComment, comment, postId, user?.uid]);

    useFocusEffect(
        useCallback(() => {
            fetchComments(postId as string);

            return () => {
                setComment('');
            };
        }, [fetchComments, postId]),
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
            {!post && <Text>Пост не знайдено</Text>}
            {post && (
                <Fragment>
                    <Image source={{ uri: post.photo }} style={styles.photo} />
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={styles.commentsContainer}
                    >
                        {comments && comments.length > 0 ? (
                            comments.map((comment) => {
                                return (
                                    <CommentCard
                                        key={comment.id}
                                        model={comment}
                                        avatarPosition={
                                            comment.authorId === user?.uid
                                                ? 'right'
                                                : 'left'
                                        }
                                    />
                                );
                            })
                        ) : (
                            <View>
                                <Text>Ще немає коментарів</Text>
                            </View>
                        )}
                    </ScrollView>
                    <SafeAreaView
                        edges={['bottom']}
                        style={{ position: 'relative' }}
                    >
                        <View>
                            <TextInput
                                value={comment}
                                onChangeText={(text) => setComment(text)}
                                variant="primary"
                                placeholder="Коментувати..."
                                inputStyle={{
                                    borderRadius: 100,
                                    paddingInlineEnd: 50,
                                }}
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
                </Fragment>
            )}
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
