import { Post } from '@/models/post';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostsSlice {
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
    },
    selectors: {
        selectPosts: (state) => state.posts,
    },
});

export const { addPost, setPosts } = postsSlice.actions;

export const { selectPosts } = postsSlice.selectors;

export default postsSlice.reducer;
