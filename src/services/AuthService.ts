import api from "./api";

export interface RegisterPayload {
    FullName: string;
    email: string;
    password: string;
}
export const registerApi = (data: RegisterPayload) => {
    console.log("RegisterPayload", data.FullName)
    console.log("RegisterPayload", data)

    return api.post("auth/register", data);
};

/* LOGIN */
export const loginApi = (data: {
    email: string;
    password: string;
}) => {
    return api.post("auth/login", data);
};

