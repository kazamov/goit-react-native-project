import { UserRef } from '@/models/user';
import { addUser, selectUser, UsersSlice } from '@/redux/reducers/users-slice';
import { getUser } from '@/utils/firestore';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface UsersHookResult {
    user: UserRef | null;
}

export function useUserRef(userId: string): UsersHookResult {
    const user = useSelector((state) =>
        selectUser(state as { users: UsersSlice }, userId),
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            getUser(userId).then((user) => {
                if (user) {
                    dispatch(addUser(user));
                }
            });
        }
    }, [dispatch, user, userId]);

    return {
        user: user ?? null,
    };
}
