import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* Create checklist */
export const createChecklist = createAsyncThunk(
    "checklist/create",
    async (
        { cardId, title }: { cardId: number; title: string }
    ) => {
        const res = await api.post("/checklists", { cardId, title });

        const checklist = res.data;
        console.log("checklist", checklist)

        // ✅ NORMALIZED SHAPE
        return {
            id: checklist.id,
            title: checklist.title,
            cardId: checklist.card.id,   // 🔥 FIX
            items: checklist.items ?? [],
        };
    }
);

/* Add checklist item */
// export const addChecklistItem = createAsyncThunk(
//     "checklist/addItem",
//     async (
//         { checklistId, text }: { checklistId: number; text: string }
//     ) => {
//         const res = await 
//         api.post(`/checklists/${checklistId}/items`, { text })
        
//         console.log("res", res)

//         console.log("res data", res.data)

//         return res.data;
//     }
// );

export const addChecklistItem = createAsyncThunk(
    "checklist/addItem",
    async ({ checklistId, text }: { checklistId: number; text: string }) => {
        const res = await api.post(
            `/checklists/${checklistId}/items`,
            { text }
        );
        console.log("res", res)
        console.log("res data", res.data)

        return res.data; // MUST return item
    }
);


/* Toggle checklist item */
export const toggleChecklistItem = createAsyncThunk(
    "checklist/toggleItem",
    async (itemId: number) => {
        const res = await api.patch(
            `/checklists/items/${itemId}/toggle`  // ✅ EXACT MATCH
        );
        return res.data;
    }
);

export const deleteChecklist = createAsyncThunk(
    "checklist/delete",
    async (checklistId: number) => {
        await api.delete(`/checklists/${checklistId}`);
        return checklistId;
    }
);
