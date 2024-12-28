import { Post } from '@/models/post';
import { addComment, getComments } from '@/utils/firestore';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addComment as addCommentAction,
    CommentsSlice,
    selectComments,
    setComments,
} from '@/redux/reducers/comments-slice';
import { Comment } from '@/models/comment';
import { incrementCommentsCount } from '@/redux/reducers/posts-slice';

interface CommentsHookResult {
    comments: Comment[] | null;
    addComment: (postId: Post['id'], comment: Comment) => Promise<void>;
    fetchComments: (postId: Post['id']) => Promise<void>;
}

export function useComments(postId: string): CommentsHookResult {
    const comments = useSelector((state) =>
        selectComments(state as { comments: CommentsSlice }, postId),
    );
    const dispatch = useDispatch();

    return {
        comments,
        addComment: useCallback(
            async (postId, comment) => {
                const result = await addComment(postId, comment);
                dispatch(addCommentAction({ postId, comment: result }));
                dispatch(incrementCommentsCount(postId));
            },
            [dispatch],
        ),
        fetchComments: useCallback(
            async (postId) => {
                const comments = await getComments(postId);
                dispatch(setComments({ postId, comments }));
            },
            [dispatch],
        ),
    };
}
