import { createSlice } from "@reduxjs/toolkit";
import { toggleChecklistItem } from "./checklistThunk";

interface ChecklistState {
    items: any[];
}

const initialState: ChecklistState = {
    items: [],
};

const checklistSlice = createSlice({
    name: "checklist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(toggleChecklistItem.fulfilled, (state, action) => {
            const updatedItem = action.payload;

            const index = state.items.findIndex(
                (i) => i.id === updatedItem.id
            );

            if (index !== -1) {
                state.items[index] = updatedItem;
            }
        });
    },
});

export default checklistSlice.reducer;
