import { Post } from '@/models/post';
import { Comment } from '@/models/comment';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommentsSlice {
    postRefs: { postId: Post['id']; comments: Comment[] | null }[];
}

const initialState: CommentsSlice = {
    postRefs: [],
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment(
            state,
            action: PayloadAction<{ postId: string; comment: Comment }>,
        ) {
            const post = state.postRefs.find(
                (postRef) => postRef.postId === action.payload.postId,
            );
            if (post) {
                if (!post.comments) {
                    post.comments = [action.payload.comment];
                } else {
                    post.comments.push(action.payload.comment);
                }
            }
        },
        setComments(
            state,
            action: PayloadAction<{ postId: string; comments: Comment[] }>,
        ) {
            const post = state.postRefs.find(
                (postRef) => postRef.postId === action.payload.postId,
            );
            if (post) {
                post.comments = action.payload.comments;
            } else {
                state.postRefs.push({
                    postId: action.payload.postId,
                    comments: action.payload.comments,
                });
            }
        },
    },
    selectors: {
        selectComments: (state, postId: string) => {
            const post = state.postRefs.find(
                (postRef) => postRef.postId === postId,
            );
            return post?.comments ?? null;
        },
    },
});

export const { addComment, setComments } = commentsSlice.actions;

export const { selectComments } = commentsSlice.selectors;

export default commentsSlice.reducer;
