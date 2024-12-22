import { combineReducers } from '@reduxjs/toolkit';

import userReducer from '../reducers/user-slice';

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
