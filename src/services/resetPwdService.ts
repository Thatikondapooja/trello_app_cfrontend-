import api from "./api";

export default function resetPassword(email: string, password: string) {
    return api.post("/auth/reset-password", { email, password });
}
