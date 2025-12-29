import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBoard, fetchBoards } from "./boardThunks";

/* ---------------- TYPES ---------------- */

export interface Board {
    id: string;
    title: string;
    description?: string;
}

interface BoardState {
    // 👉 backend data
    boards: Board[];

    // 👉 mock data (UI only / fallback)
    mockBoards: Board[];

    selectedBoardId: number | null;

    loading: boolean;
    error: string | null;
}

/* ---------------- INITIAL STATE ---------------- */

const initialState: BoardState = {
    boards: [],

    mockBoards: [
        {
            id: "1",
            title: "Project Alpha",
            description: "Main development board",
        },
        {
            id: "2",
            title: "Personal Tasks",
            description: "Daily todos",
        },
        {
            id: "3",
            title: "Learning",
            description: "Study & practice",
        },
    ],

    selectedBoardId: null,

    loading: false,
    error: null,
};

/* ---------------- SLICE ---------------- */

const boardSlice = createSlice({
    name: "board",
    initialState,

    reducers: {
        selectBoard(state, action: PayloadAction<number>) {
            state.selectedBoardId = action.payload;
        },

        // optional: reset board state on logout
        resetBoards(state) {
            state.boards = [];
            state.selectedBoardId = null;
        },
    },

    extraReducers: (builder) => {
        builder
            /* ---------- FETCH BOARDS ---------- */
            .addCase(fetchBoards.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBoards.fulfilled, (state, action) => {
                state.loading = false;
                state.boards = action.payload;
            })
            .addCase(fetchBoards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            /* ---------- CREATE BOARD ---------- */
            .addCase(createBoard.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBoard.fulfilled, (state, action) => {
                state.loading = false;
                state.boards.push(action.payload);
            })
            .addCase(createBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

/* ---------------- EXPORTS ---------------- */

export const { selectBoard, resetBoards } = boardSlice.actions;
export default boardSlice.reducer;
