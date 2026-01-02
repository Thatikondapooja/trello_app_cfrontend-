import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCard, fetchCardById, fetchCardsByList, moveCardThunk } from "./cardThunks";
import { arrayMove } from "@dnd-kit/sortable";

interface Card {
    id: number;
    title: string;
    description: string | null;
    dueDate: string | null;
    labels: string[];
    listId: number;
    position: number;
}


interface CardState {
    cards: Card[];
    selectedCard: Card | null;
    loading: boolean;
    error: string | null;
}

const initialState: CardState = {
    cards: [],
    selectedCard: null,
    loading: false,
    error: null,
};

const cardSlice = createSlice({
    name: "card",
    initialState,

    reducers: {
        // 🔁 SAME LIST REORDER
        reorderCards(
            state,
            action: PayloadAction<{
                listId: number;
                activeId: number;
                overId: number;
            }>
        ) {
            const { listId, activeId, overId } = action.payload;

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

            const from = listIndexes[oldIndex].index;
            const to = listIndexes[newIndex].index;

            state.cards = arrayMove(state.cards, from, to);

        },

        // 🧾 CARD DETAILS MODAL
        setSelectedCard(state, action: PayloadAction<Card>) {
            state.selectedCard = action.payload;
        },
        clearSelectedCard(state) {
            state.selectedCard = null;
        },
    },

    extraReducers: (builder) => {
        builder
            /* FETCH */
            .addCase(fetchCardsByList.fulfilled, (state, action) => {
                const { listId, cards } = action.payload;

                cards.forEach((card: any) => {
                    const exists = state.cards.find(c => c.id === card.id);
                    if (!exists) {
                        state.cards.push({
                            id: card.id,
                            title: card.title,
                            description: card.description,
                            dueDate: card.dueDate,
                            labels: card.labels,
                            listId,
                            position: card.position,

                        });
                    }
                });
            })

            /* CREATE */
            .addCase(createCard.fulfilled, (state, action) => {
                const card = action.payload;

                state.cards.push({
                    id: card.id,
                    title: card.title,
                    description: card.description,
                    dueDate: card.dueDate,
                    labels: card.labels,
                    listId: card.list.id,
                    position: card.position,
                });
            })

            .addCase(fetchCardById.fulfilled, (state, action) => {
                state.selectedCard = action.payload;
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


export const {
    reorderCards,
    setSelectedCard,
    clearSelectedCard,
} = cardSlice.actions;

export default cardSlice.reducer;
