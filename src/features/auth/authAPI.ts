import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi, RegisterPayload } from "../../services/AuthService";


export const registerUser = createAsyncThunk(
    "auth/register",
    async (payload: RegisterPayload, { rejectWithValue }) => {
        try {
            const res = await registerApi(payload);
            console.log("res registerApi", res)
            console.log("res registerApi", res.data)

            return res.data;
        } catch (err: any) {
            const message = err.response?.data?.message;
            const errorMessage = Array.isArray(message) ? message[0] : (typeof message === 'string' ? message : "Register failed");
            return rejectWithValue(errorMessage);
        }
    }
);

/* LOGIN */
export const loginUser = createAsyncThunk(
    "auth/login",
    async (
        payload: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await loginApi(payload);
            console.log("res loginApi", res)
            console.log("res loginApi", res.data)
            console.log(" accessToken from res loginApi", res.data.accessToken)
            console.log(" refreshToken from res loginApi", res.data.refreshToken)

            return res.data;
        } catch (err: any) {
            const message = err.response?.data?.message;
            const errorMessage = Array.isArray(message) ? message[0] : (typeof message === 'string' ? message : "Login failed");
            return rejectWithValue(errorMessage);
        }
    }
) 
