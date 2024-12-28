import { combineReducers } from '@reduxjs/toolkit';

import userReducer from '../reducers/user-slice';
import usersReducer from '../reducers/users-slice';
import postsReducer from '../reducers/posts-slice';
import commentsReducer from '../reducers/comments-slice';

const rootReducer = combineReducers({
    user: userReducer,
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
});

export default rootReducer;
