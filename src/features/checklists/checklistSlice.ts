import { createSlice } from "@reduxjs/toolkit";
import {
    createChecklist,
    addChecklistItem,
    toggleChecklistItem,
    deleteChecklist,
} from "./checklistThunk";

interface ChecklistState {
    checklists: any[];
}

const initialState: ChecklistState = {
    checklists: [],
};

const checklistSlice = createSlice({
    name: "checklist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            /* ✅ CREATE CHECKLIST */
            .addCase(createChecklist.fulfilled, (state, action) => {
                state.checklists.push(action.payload);
            })

            /* ✅ ADD CHECKLIST ITEM */
            .addCase(addChecklistItem.fulfilled, (state, action) => {
                const item = action.payload;
                const checklistId = item.checklist.id;

                const checklist = state.checklists.find(
                    (c) => c.id === checklistId
                );

                if (checklist) {
                    checklist.items.push(item);
                }
            })

            /* ✅ TOGGLE CHECKLIST ITEM */
            .addCase(toggleChecklistItem.fulfilled, (state, action) => {
                const updatedItem = action.payload;

                for (const checklist of state.checklists) {
                    const item = checklist.items.find(
                        (i:any) => i.id === updatedItem.id
                    );

                    if (item) {
                        item.isCompleted = updatedItem.isCompleted;
                        break;
                    }
                }
            })

            .addCase(deleteChecklist.fulfilled, (state, action) => {
                const checklistId = action.payload;

                state.checklists = state.checklists.filter(
                    (c) => c.id !== checklistId
                );
            });

    },
});

export default checklistSlice.reducer;
