// src/features/member/memberSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchBoardMembers } from "./memberThunk";

interface MemberState {
    boardMembers: any[];
    loading: boolean;
}

const initialState: MemberState = {
    boardMembers: [],
    loading: false,
};

const memberSlice = createSlice({
    name: "members",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoardMembers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBoardMembers.fulfilled, (state, action) => {
                state.boardMembers = action.payload;
                state.loading = false;
            })
            .addCase(fetchBoardMembers.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default memberSlice.reducer;
