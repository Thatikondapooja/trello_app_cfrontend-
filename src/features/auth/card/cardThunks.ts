import { createAsyncThunk } from "@reduxjs/toolkit";
import { BoardCard, SaveCardOrderPayload } from "./types";

import {
    archiveCardAPI,
    createCardApi,
    moveCardApi,
    restoreCardAPI,
    saveCardOrderApi,
    updateCardApi,
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
            // Ensure listId is passed to reducer even if backend omits it
            return { ...res.data, listId: payload.listId };
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
        payload: { cardId: number; toListId: string },
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

export const saveCardOrder = createAsyncThunk<
    void, // ✅ return type
    SaveCardOrderPayload // ✅ payload type (IMPORTANT)
>(
    "card/saveOrder",
    async (payload, { rejectWithValue }) => {
        try {
            await saveCardOrderApi(payload); // ✅ payload is now typed
        } catch {
            return rejectWithValue("Failed to save order");
        }
    }
);

export const fetchCardById = createAsyncThunk(
    "card/fetchById",
    async (cardId: number) => {
        const res = await api.get(`/cards/${cardId}`);
        console.log("res fetchById", res)
        return res.data;
    }
);

export const updateCard = createAsyncThunk(
    "card/update",
    async (
        payload: { id: number; data: Partial<BoardCard> },
        { rejectWithValue }
    ) => {
        try {
            const res = await updateCardApi(payload.id, payload.data);
            return res.data;

        } catch {
            return rejectWithValue("Failed to update card");
        }
    }
);

// export const completeCard = createAsyncThunk(
//     "card/complete",
//     async (cardId: number) => {
//         const res = await api.patch(`/cards/${cardId}/complete`);
//         console.log("res", res)
//         return res.data;
//     }
// );

export const toggleCardComplete = createAsyncThunk(
    "card/toggleComplete",
    async (cardId: number) => {
        const res = await api.patch(`/cards/${cardId}/toggle-complete`);
        return res.data;
    }
);


export const archiveCardThunk = createAsyncThunk(
    "cards/archive",
    async (cardId: number) => {
        await archiveCardAPI(cardId);
        return cardId;
    }
);

export const restoreCardThunk = createAsyncThunk(
    "cards/restore",
    async (cardId: number) => {
        await restoreCardAPI(cardId);
        return cardId;
    }
);
