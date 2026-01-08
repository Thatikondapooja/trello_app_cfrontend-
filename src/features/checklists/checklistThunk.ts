import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Toggle checklist item (check / uncheck)
 */
export const toggleChecklistItem = createAsyncThunk(
    "checklist/toggleItem",
    async (itemId: number) => {
        const res = await axios.patch(
            `/checklists/item/${itemId}/toggle`
        );
        return res.data; // updated checklist item
    }
);
