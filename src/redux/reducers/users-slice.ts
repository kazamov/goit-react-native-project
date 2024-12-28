import { UserRef } from '@/models/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UsersSlice {
    users: UserRef[];
}

const initialState: UsersSlice = {
    users: [],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<UserRef>) {
            state.users.push(action.payload);
        },
    },
    selectors: {
        selectUser: (state, userId: string) =>
            state.users.find((user) => user.uid === userId),
    },
});

export const { addUser } = usersSlice.actions;

export const { selectUser } = usersSlice.selectors;

export default usersSlice.reducer;
