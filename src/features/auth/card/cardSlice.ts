import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCard, fetchCardsByList, moveCardThunk } from "./cardThunks";
import { arrayMove } from "@dnd-kit/sortable";

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

    reducers: {
        reorderCards(
            state,
            action: PayloadAction<{
                listId: number;
                activeId: number;
                overId: number;
            }>
        ) {
            const { listId, activeId, overId } = action.payload;

            // 1️⃣ Get indexes ONLY inside this list
            const listIndexes = state.cards
                .map((c, index) => ({ c, index }))
                .filter(({ c }) => c.listId === listId);

            const oldIndex = listIndexes.findIndex(
                ({ c }) => c.id === activeId
            );
            const newIndex = listIndexes.findIndex(
                ({ c }) => c.id === overId
            );

            if (oldIndex === -1 || newIndex === -1) return;

            // 2️⃣ Extract actual positions in state.cards
            const from = listIndexes[oldIndex].index;
            const to = listIndexes[newIndex].index;

            // 3️⃣ Move ONLY inside state.cards
            state.cards = arrayMove(state.cards, from, to);
        },
    },

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

            /* MOVE BETWEEN LISTS */
            .addCase(moveCardThunk.fulfilled, (state, action) => {
                const moved = action.payload;
                const card = state.cards.find(c => c.id === moved.id);
                if (card) {
                    card.listId = moved.list.id;
                }
            });
    },
});

export const { reorderCards } = cardSlice.actions;
export default cardSlice.reducer;
