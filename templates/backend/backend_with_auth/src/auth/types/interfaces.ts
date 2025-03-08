export interface Tokens {
    access: string;
    refresh: string;
}

export interface JwtPayload {
    userId: string;
    email: string;
}
