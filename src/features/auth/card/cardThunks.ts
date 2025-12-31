import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createCardApi,
    fetchCardsByListApi,
    moveCardApi,
    saveCardOrderApi,
} from "../../../services/cardService";
import api from "../../../services/api";

export const createCard = createAsyncThunk(
    "card/create",
    async (
        payload: { title: string; listId: number },
        { rejectWithValue }
    ) => {
        try {
            const res = await createCardApi(payload);
            return res.data;
        } catch {
            return rejectWithValue("Failed to create card");
        }
    }
);

// cardThunks.ts
export const fetchCardsByList = createAsyncThunk(
    "card/fetchByList",
    async (listId: number, { rejectWithValue }) => {
        try {
            const res = await api.get(`/cards/list/${listId}`);
            return { listId, cards: res.data };
        } catch (err) {
            return rejectWithValue("Failed to fetch cards");
        }
    }
);


export const moveCardThunk = createAsyncThunk(
    "card/move",
    async (
        payload: { cardId: string; toListId: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await moveCardApi(payload);
            return res.data;
        } catch {
            return rejectWithValue("Failed to move card");
        }
    }

);

export const saveCardOrder = createAsyncThunk(
    "card/saveOrder",
    async (payload, { rejectWithValue }) => {
        try {
            await saveCardOrderApi(payload);
        } catch {
            return rejectWithValue("Failed to save order");
        }
    }
);

