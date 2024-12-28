import { User as FbUser } from 'firebase/auth';

export interface User {
    uid: FbUser['uid'];
    email: FbUser['email'];
    displayName: FbUser['displayName'];
    photoURL: FbUser['photoURL'];
    emailVerified: FbUser['emailVerified'];
}

export interface UserRef {
    uid: User['uid'];
    photoURL: User['photoURL'];
    displayName: FbUser['displayName'];
}
