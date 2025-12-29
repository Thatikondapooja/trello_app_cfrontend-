export interface User {
    id: string;
    email: string;
    role: "ADMIN" | "MEMBER";
}

export interface AuthState {
    user: User | null;
}
