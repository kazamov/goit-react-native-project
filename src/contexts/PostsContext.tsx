import { createContext, ReactNode, useContext, useState } from 'react';
import { Post } from '@/models/post';

interface PostsContextType {
    posts: Post[];
    addPost: (post: Post) => void;
}

const PostsContext = createContext<PostsContextType>({} as PostsContextType);

const PostsProvider = ({ children }: { children: ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    return (
        <PostsContext.Provider
            value={{
                posts,
                addPost: (post: Post) => {
                    setPosts((prevPosts) => [...prevPosts, post]);
                },
            }}
        >
            {children}
        </PostsContext.Provider>
    );
};

const usePosts = () => {
    return useContext(PostsContext);
};

export { PostsContext, PostsProvider, usePosts };
