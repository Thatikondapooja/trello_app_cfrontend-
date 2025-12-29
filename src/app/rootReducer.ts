import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import boardReducer from "../features/auth/board/boardSlice";
import listReducer from "../features/auth/list/listSlice";
import cardReducer from "../features/auth/card/cardSlice";
import activityReducer from "../features/activity/activitySlice";

const rootReducer = combineReducers({
    auth: authReducer,
    board: boardReducer,
    list: listReducer,
    card: cardReducer,
    activity: activityReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
