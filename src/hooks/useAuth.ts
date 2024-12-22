import { auth } from '@/firebase-config';
import {
    clearUserInfo,
    selectUserInfo,
    setUserInfo,
} from '@/redux/reducers/user-slice';
import {
    SigninParams,
    SignupParams,
    signUp,
    signIn,
    signOut,
    transformFbUser,
} from '@/utils/auth';
import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface AuthHookResult {
    signOut: () => void;
    signIn: (params: SigninParams) => void;
    signUp: (params: SignupParams) => void;
}

export function useAuth(): AuthHookResult {
    const dispatch = useDispatch();

    return {
        signUp: useCallback(async (params: SignupParams) => {
            await signUp(params);
        }, []),
        signIn: useCallback(
            async (params: SigninParams) => {
                const user = await signIn(params);
                dispatch(setUserInfo(user));
                return user;
            },
            [dispatch],
        ),
        signOut: useCallback(async () => {
            await signOut();
            dispatch(clearUserInfo());
        }, [dispatch]),
    };
}

export function useAuthStateChange() {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                dispatch(setUserInfo(transformFbUser(user)));
            } else {
                dispatch(clearUserInfo());
            }
        });
        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    useEffect(() => {
        if (userInfo === undefined) {
            return;
        }

        if (userInfo) {
            router.navigate('/(tabs)/posts');
        } else {
            router.navigate('/(auth)/login');
        }
    }, [userInfo]);
}
