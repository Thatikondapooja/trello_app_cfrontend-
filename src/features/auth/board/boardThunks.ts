import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBoardApi, fetchBoardsApi } from "../../../services/boardService";

export const createBoard = createAsyncThunk(
    "board/create",
    async (
        payload: { title: string; description?: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await createBoardApi(payload);
            console.log("res", res)
            console.log("res", res.data)
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

export const fetchBoards = createAsyncThunk(
    "board/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchBoardsApi();
            return res.data;
        } catch (err: any) {
            return rejectWithValue("Failed to fetch boards");
        }
    }
);
