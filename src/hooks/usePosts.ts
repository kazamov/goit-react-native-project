import { Post } from '@/models/post';
import { User } from '@/models/user';
import { selectPosts, setPosts } from '@/redux/reducers/posts-slice';
import { addPost, getAllPosts } from '@/utils/firestore';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost as addPostAction } from '@/redux/reducers/posts-slice';

interface PostsHookResult {
    posts: Post[] | null;
    addPost: (userId: User['uid'], post: Post) => Promise<void>;
    fetchPosts: () => Promise<void>;
}

export function usePosts(): PostsHookResult {
    const posts = useSelector(selectPosts);
    const dispatch = useDispatch();

    return {
        posts,
        addPost: useCallback(
            async (userId: User['uid'], post: Post) => {
                await addPost(userId, post);
                dispatch(addPostAction(post));
            },
            [dispatch],
        ),
        fetchPosts: useCallback(async () => {
            const posts = await getAllPosts();
            dispatch(setPosts(posts));
        }, [dispatch]),
    };
}
