export class UserWithToken {
    token?: string;
    user: User;
}

export class Login {
    email: string;
    password: string;
}

export class User {
    clientID?: number;
    userID: number;
    userName: string;
    displayName: string;
    position?: string;
    email?: string;
    phone?: string;
    isAdministrator?: boolean;
    // password: string;
}