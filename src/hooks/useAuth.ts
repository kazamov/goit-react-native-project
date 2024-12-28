import { auth } from '@/firebase-config';
import {
    clearUserInfo,
    selectUserInfo,
    setUserInfo,
} from '@/redux/reducers/user-slice';
import { addUser } from '@/redux/reducers/users-slice';
import {
    SigninParams,
    SignupParams,
    signUp,
    signIn,
    signOut,
    transformFbUser,
    transformFbUserToUserRef,
} from '@/utils/auth';
import { Href, router, usePathname } from 'expo-router';
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
        signUp: useCallback(
            async (params: SignupParams) => {
                const user = await signUp(params);
                dispatch(setUserInfo(user));
                dispatch(addUser(user));
            },
            [dispatch],
        ),
        signIn: useCallback(
            async (params: SigninParams) => {
                const user = await signIn(params);
                dispatch(setUserInfo(user));
                dispatch(addUser(user));
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
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                dispatch(setUserInfo(transformFbUser(user)));
                dispatch(addUser(transformFbUserToUserRef(user)));
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

        const authPages: Href[] = ['/login', '/registration'];
        if (userInfo) {
            if (authPages.concat(['/']).includes(pathname as Href)) {
                router.navigate('/posts');
            }
        } else {
            if (!authPages.includes(pathname as Href)) {
                router.navigate('/login');
            }
        }
    }, [pathname, userInfo]);
}
