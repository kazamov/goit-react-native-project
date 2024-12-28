import { View, StyleSheet, Image, Text, Pressable } from 'react-native';

import { Post } from '@/models/post';
import CommentIcon from '@/icons/CommentIcon';
import { globalColorVariables } from '@/styles/variables';
import MapPinIcon from '@/icons/MapPinIcon';

interface PostCardProps {
    model: Post;
    onCommentsPress: (postId: Post['id']) => void;
    onPlacePress: (postId: Post['id']) => void;
}

export default function PostCard({
    model,
    onCommentsPress,
    onPlacePress,
}: PostCardProps) {
    return (
        <View style={styles.postCard}>
            <Image source={{ uri: model.photo }} style={styles.postCardImage} />
            <Text style={styles.postCardTitle}>{model.title}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Pressable
                    style={styles.commentsContainer}
                    onPress={() => onCommentsPress(model.id)}
                >
                    <CommentIcon />
                    <Text style={{ color: globalColorVariables.gray3 }}>
                        {model.comments.length}
                    </Text>
                </Pressable>
                <Pressable
                    style={styles.placeContainer}
                    onPress={() => onPlacePress(model.id)}
                >
                    <MapPinIcon />
                    <Text style={styles.placeTitle}>{model.place}</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    postCard: {
        width: '100%',
        gap: 8,
    },
    postCardImage: {
        width: '100%',
        height: 240,
        borderRadius: 8,
    },
    postCardTitle: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: 0,
        color: globalColorVariables.inputText,
    },
    commentsContainer: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    placeContainer: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    placeTitle: {
        color: globalColorVariables.inputText,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
    },
});
