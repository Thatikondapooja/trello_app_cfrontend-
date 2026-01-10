import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const addMemberToCard = createAsyncThunk(
    "members/addToCard",
    async (
        { cardId, userId }: { cardId: number; userId: number },
        { rejectWithValue }
    ) => {
        try {
            const res = await api.post(
                `/cards/${cardId}/members`,
                { userId }
            );
            return res.data; // updated card or member
        } catch (err) {
            return rejectWithValue("Failed to add member to card");
        }
    }
);

export const fetchBoardMembers = createAsyncThunk(
    "members/fetchBoardMembers",
    async (boardId: number, { rejectWithValue }) => {
        try {
            const res = await api.get(`/boards/${boardId}/members`);
            return res.data; // array of users
        } catch (err) {
            return rejectWithValue("Failed to fetch board members");
        }
    }
);
