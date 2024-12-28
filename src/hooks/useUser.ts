import { selectUserInfo } from '@/redux/reducers/user-slice';
import { useSelector } from 'react-redux';

export function useUser() {
    return useSelector(selectUserInfo);
}
