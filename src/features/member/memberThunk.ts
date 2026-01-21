// src/features/member/memberThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* Fetch board members */
export const fetchBoardMembers = createAsyncThunk(
    "members/fetchBoardMembers",
    async (boardId: number) => {
        const res = await api.get(`/boards/${boardId}/members`);
        return res.data; // [{id, FullName, email}]
    }
);

/* Add member to card */
export const addMemberToCard = createAsyncThunk(
    "members/addMemberToCard",
    async ({ cardId, userId }: { cardId: number; userId: number }) => {
        const res = await api.post(`/cards/${cardId}/members`, { userId });
        return res.data; // updated member or card
    }
);
