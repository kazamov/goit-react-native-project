import { User } from '@/models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSlice {
    userInfo?: User | null;
}

const initialState: UserSlice = {
    userInfo: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<User | null>) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state) {
            state.userInfo = null;
        },
    },
    selectors: {
        selectUserInfo: (state) => state.userInfo,
    },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export const { selectUserInfo } = userSlice.selectors;

export default userSlice.reducer;
