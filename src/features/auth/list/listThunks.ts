import { createAsyncThunk } from "@reduxjs/toolkit";
import { createListApi, fetchListsApi } from "../../../services/listService";

export const createList = createAsyncThunk(
    "list/create",
    async (
        payload: { title: string; boardId?: number },
        { rejectWithValue }
    ) => {
        try {
            const res = await createListApi(payload);
            console.log("res", res)
            console.log("res", res.data)
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

export const fetchLists = createAsyncThunk(
    "list/fetch",
    async (boardId:number, { rejectWithValue }) => {
        try {
            const res = await fetchListsApi(boardId);
            console.log("res fetch" , res)
            console.log("res fetch", res.data)
            return res.data;
        } catch (err: any) {
            return rejectWithValue("Failed to fetch lists");
        }
    }
);
