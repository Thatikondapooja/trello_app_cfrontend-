import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Activity, ActivityState } from "./types";

const initialState: ActivityState = {
    activities: [],
};

const activitySlice = createSlice({
    name:"activity",
    initialState,

    reducers:{

        addActivity(state, action: PayloadAction<Activity>) {
            // newest activity first (like Trello)
            state.activities.unshift(action.payload);
        },

    },
    
});

export const { addActivity } = activitySlice.actions;
export default activitySlice.reducer;
