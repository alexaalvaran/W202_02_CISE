export type User = {
    _id?: string;
    email?: string;
    password: string;
}

export const DefaultUser: User =  {
    _id: undefined,
    email: '',
    password: '',
}

