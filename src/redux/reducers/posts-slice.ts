import { Post } from '@/models/post';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostsSlice {
    posts: Post[] | null;
}

const initialState: PostsSlice = {
    posts: null,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<Post>) {
            if (state.posts) {
                state.posts.push(action.payload);
            } else {
                state.posts = [action.payload];
            }
        },
        setPosts(state, action: PayloadAction<Post[]>) {
            state.posts = action.payload;
        },
        incrementCommentsCount(state, action: PayloadAction<string>) {
            const post = state.posts?.find(
                (post) => post.id === action.payload,
            );
            if (post) {
                post.commentsCount++;
            }
        },
    },
    selectors: {
        selectPosts: (state) => state.posts,
        selectPost: (state, postId: string) => {
            return state.posts?.find((post) => post.id === postId) ?? null;
        },
    },
});

export const { addPost, setPosts, incrementCommentsCount } = postsSlice.actions;

export const { selectPosts, selectPost } = postsSlice.selectors;

export default postsSlice.reducer;
