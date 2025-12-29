import { createSlice } from "@reduxjs/toolkit";
import { createList, fetchLists } from "./listThunks";
import { ListsState } from "./types";

const initialState: ListsState = {
    lists: [],
    loading: false,
    error: null,
};

const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        clearLists(state) {
            state.lists = [];
        },
    },
    extraReducers: (builder) => {
        builder
            /* ---------- FETCH LISTS ---------- */
            .addCase(fetchLists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLists.fulfilled, (state, action) => {
                state.loading = false;
                state.lists = action.payload.map((list: any) => ({
                    id: list.id,
                    title: list.title,
                    boardId: list.board.id,
                }));
            })
            .addCase(fetchLists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            /* ---------- CREATE LIST ---------- */
            .addCase(createList.fulfilled, (state, action) => {
                const list = action.payload;
                state.lists.push({
                    id: list.id,
                    title: list.title,
                    boardId: list.board.id,
                });
            });
    },
});

export const { clearLists } = listSlice.actions;
export default listSlice.reducer;
