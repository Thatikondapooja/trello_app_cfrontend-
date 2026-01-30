import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createList, fetchLists } from "./listThunks";
import { ListsState } from "./types";
import { arrayMove } from "@dnd-kit/sortable";

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
        reorderLists(state, action: PayloadAction<{ activeId: number; overId: number }>) {
            const { activeId, overId } = action.payload;
            const oldIndex = state.lists.findIndex((l) => l.id === activeId);
            const newIndex = state.lists.findIndex((l) => l.id === overId);
            if (oldIndex !== -1 && newIndex !== -1) {
                state.lists = arrayMove(state.lists, oldIndex, newIndex);
            }
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
                    boardId: action.meta.arg, // ✅ Use the arg passed to thunk
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

export const { clearLists, reorderLists } = listSlice.actions;
export default listSlice.reducer;
