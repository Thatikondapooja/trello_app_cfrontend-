// import { createSlice } from "@reduxjs/toolkit";
// import { AuthState } from "./types";

// const initialState: AuthState = {
//     user: null,
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         loginSuccess(state) {
//             state.user = {
//                 id: "1",
//                 email: "admin@trello.com",
//                 role: "ADMIN",
//             };
//         },
//         logout(state) {
//             state.user = null;
//         },
//     },
// });

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authAPI";

interface AuthState {
    user: any;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        /* LOGIN */
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.accessToken;

                localStorage.setItem(
                    "access_token",
                    action.payload.accessToken
                );
                state.token = action.payload.refreshToken;

                localStorage.setItem(
                    "refresh_token",
                    action.payload.refreshToken
                );

            })
            .addCase(loginUser.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });

        /* REGISTER */
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
