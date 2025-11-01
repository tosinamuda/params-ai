export type UserCreate = {
    uid: string;
    email: string;
    emailVerified: boolean;
    displayName: string;
    isAnonymous: boolean;
    photoURL: string;
    createdAt: string; //string timestamp e.g "1708036109750"
    lastLoginAt: string; //string timestamp e.g "1708161971329"
};
