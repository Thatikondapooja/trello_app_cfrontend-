import { createSlice } from "@reduxjs/toolkit";
import { addMemberToCard, fetchBoardMembers } from "./memberThunk";

interface MemberState {
    boardMembers: any[];
    loading: boolean;
}

const initialState: MemberState = {
    boardMembers: [],
    loading: false,
};
interface MemberState {
    boardMembers: any[];
    loading: boolean;
}

const memberSlice = createSlice({
    name: "members",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addMemberToCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(addMemberToCard.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addMemberToCard.rejected, (state) => {
                state.loading = false;
            })
   

 .addCase(fetchBoardMembers.pending, (state) => {
     state.loading = true;
 })
    .addCase(fetchBoardMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.boardMembers = action.payload;
    })
    .addCase(fetchBoardMembers.rejected, (state) => {
        state.loading = false;
    });
},

    
})
export default memberSlice.reducer;
