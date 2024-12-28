import { View, StyleSheet, Text } from 'react-native';
import { Comment } from '@/models/comment';
import Avatar from './Avatar';
import { globalColorVariables } from '@/styles/variables';

interface CommentCardProps {
    model: Comment;
    avatarPosition: 'left' | 'right';
}

export default function CommentCard({
    model,
    avatarPosition,
}: CommentCardProps) {
    return (
        <View
            style={[
                styles.container,
                avatarPosition === 'left'
                    ? styles.avatarLeftLayout
                    : styles.avatarRightLayout,
            ]}
        >
            <Avatar image={null} size="small" />
            <View
                style={[
                    styles.comment,
                    avatarPosition === 'left'
                        ? styles.commentRightLayout
                        : styles.commentLeftLayout,
                ]}
            >
                <Text style={styles.text}>{model.text}</Text>
                <Text
                    style={[
                        styles.date,
                        avatarPosition === 'left'
                            ? styles.dateRight
                            : styles.dateLeft,
                    ]}
                >
                    {model.date.toLocaleDateString()}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    avatarLeftLayout: {
        flexDirection: 'row',
    },
    avatarRightLayout: {
        flexDirection: 'row-reverse',
    },
    comment: {
        borderRadius: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
        padding: 16,
    },
    commentLeftLayout: {
        borderTopRightRadius: 0,
    },
    commentRightLayout: {
        borderTopLeftRadius: 0,
    },
    text: {
        color: globalColorVariables.inputText,
        fontFamily: 'Roboto_400Regular',
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: 0,
    },
    date: {
        width: '100%',
        color: globalColorVariables.gray3,
        fontFamily: 'Roboto_400Regular',
        fontSize: 10,
        lineHeight: 11,
        letterSpacing: 0,
    },
    dateLeft: {
        textAlign: 'left',
    },
    dateRight: {
        textAlign: 'right',
    },
});
