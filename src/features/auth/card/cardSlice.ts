import { createSlice } from "@reduxjs/toolkit";
import { createCard, fetchCardsByList, moveCardThunk } from "./cardThunks";

interface Card {
    id: number;
    title: string;
    listId: number;
}

interface CardState {
    cards: Card[];
    loading: boolean;
    error: string | null;
}

const initialState: CardState = {
    cards: [],
    loading: false,
    error: null,
};

const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /* FETCH */
            .addCase(fetchCardsByList.fulfilled, (state, action) => {
                const { listId, cards } = action.payload;

                cards.forEach((card: any) => {
                    const exists = state.cards.find((c) => c.id === card.id);
                    if (!exists) {
                        state.cards.push({
                            id: card.id,
                            title: card.title,
                            listId,
                        });
                    }
                });
            })

        

            /* CREATE */
            .addCase(createCard.fulfilled, (state, action) => {
                state.cards.push({
                    id: action.payload.id,
                    title: action.payload.title,
                    listId: action.payload.list.id,
                });
            })

            /* MOVE */
            .addCase(moveCardThunk.fulfilled, (state, action) => {
                const moved = action.payload;
                const card = state.cards.find(c => c.id === moved.id);
                if (card) {
                    card.listId = moved.list.id;
                }
            });
    },
});

export default cardSlice.reducer;
