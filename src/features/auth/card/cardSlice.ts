import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCard, fetchCardById, fetchCardsByList, moveCardThunk, toggleCardComplete, updateCard } from "./cardThunks";
import { arrayMove } from "@dnd-kit/sortable";
import { BoardCard, Checklist, ChecklistItem, FullCard } from "./types";
import { addChecklistItem, createChecklist, deleteChecklist, toggleChecklistItem } from "../../checklists/checklistThunk";
import { addMemberToCard } from "../../member/memberThunk";

// interface Card {
//     id: number;
//     title: string;
//     description: string | null;
//     dueDate: string | null;
//     labels: { name: string; color: string }[]; // ✅ FIX
//     reminderMinutes:number|null;
//     listId: number;
//     position: number;
//     isCompleted:boolean;
//     reminderSent:boolean;
//     selectedCard: FullCard | null;

// }


interface CardState {
    cards: BoardCard[];
    selectedCard: FullCard | null;
    loading: boolean;
    error: string | null;
}

const initialState: CardState = {
    cards: [],
    selectedCard: null,
    loading: false,
    error: null,
};
function calculateChecklistSummary(checklists: Checklist[]) {
    const total = checklists.reduce(
        (sum, c) => sum + (c.items?.length || 0),
        0
    );
    const completed = checklists.reduce(
        (sum, c) => sum + (c.items?.filter((item: ChecklistItem) => item.isCompleted).length || 0),
        0
    );

    return total > 0 ? { completed, total } : null;
}

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
        setSelectedCard(state, action: PayloadAction<FullCard>) {
            state.selectedCard = action.payload;
            console.log("setSelectedCard", setSelectedCard)
        },
        clearSelectedCard(state) {
            state.selectedCard = null;
        },


        // updateCard: (state, action) => {
        //     const { cardId, updatedData } = action.payload;

        //     state.addProjects = state.addProjects.map((p) =>
        //         p.projectId === projectId ? { ...p, ...updatedData } : p
        //     );
        // },

    },

    extraReducers: (builder) => {
        builder
            /* FETCH */
            .addCase(fetchCardsByList.fulfilled, (state, action) => {
                const { listId, cards } = action.payload;

                cards.forEach((card: any) => {
                    if (!state.cards.find(c => c.id === card.id)) {
                        state.cards.push({
                            id: card.id,
                            title: card.title,
                            description: card.description,
                            dueDate: card.dueDate,
                            reminderMinutes: card.reminderMinutes,
                            isCompleted: card.isCompleted,
                            labels: card.labels,
                            listId,
                            position: card.position,
                            reminderSent: card.reminderSent,
                            selectedCard: card.selectedCard,
                            members: card.members ?? [],

                            // ✅ CORRECT
                            checklistSummary: card.checklistSummary ?? null,
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
                    description: card.description || null,
                    dueDate: card.dueDate || null,
                    reminderMinutes: card.reminderMinutes || null,
                    isCompleted: card.isCompleted || false,
                    labels: card.labels || [],
                    listId: card.listId, // Ensure listId is present in payload or mapped correctly
                    position: card.position || 0,
                    reminderSent: card.reminderSent || false,
                    selectedCard: null,
                    checklistSummary: null,
                    members: []
                });
            })

            /* CREATE */
            .addCase(createChecklist.fulfilled, (state, action) => {
                const checklist = action.payload;
                console.log("checklist", checklist);

                if (!state.selectedCard) return;

                if (state.selectedCard.id === checklist.cardId) {
                    state.selectedCard.checklists = [
                        ...(state.selectedCard.checklists ?? []),
                        checklist,
                    ];
                }
                console.log("checklist.cardId:", checklist.cardId);
                console.log("state.selectedCard.id:", state.selectedCard.id);
                console.log("UPDATED CHECKLISTS:", state.selectedCard.checklists);
            })


            /* ADD CHECKLIST ITEM → UPDATE selectedCard */
            .addCase(addChecklistItem.fulfilled, (state, action) => {
                if (!state.selectedCard) return;

                const item = action.payload;
                const checklist = state.selectedCard.checklists.find(
                    c => c.id === item.checklist.id
                );

                if (checklist) {
                    checklist.items.push(item);

                    // 🔥 UPDATE BOARD CARD SUMMARY
                    const boardCard = state.cards.find(
                        c => c.id === state.selectedCard!.id
                    );

                    if (boardCard) {
                        boardCard.checklistSummary = calculateChecklistSummary(
                            state.selectedCard.checklists
                        );
                    }
                }
            })


            /* TOGGLE CHECKLIST ITEM → UPDATE selectedCard */
            .addCase(toggleChecklistItem.fulfilled, (state, action) => {
                if (!state.selectedCard) return;

                const updatedItem = action.payload;

                for (const checklist of state.selectedCard.checklists) {
                    const item = checklist.items.find(i => i.id === updatedItem.id);
                    if (item) {
                        item.isCompleted = updatedItem.isCompleted;
                        break;
                    }
                }

                const boardCard = state.cards.find(
                    c => c.id === state.selectedCard!.id
                );

                if (boardCard) {
                    boardCard.checklistSummary = calculateChecklistSummary(
                        state.selectedCard.checklists
                    );
                }
            })


            //     state.cards.push({
            //         id: card.id,
            //         title: card.title,
            //         description: card.description,
            //         dueDate: card.dueDate,
            //         labels: card.labels,
            //         listId: card.list.id,
            //         position: card.position,
            //         reminderMinutes: card.reminderMinutes,
            //         isCompleted: card.isCompleted,
            //         reminderSent: card.reminderSent,
            //         selectedCard: card.selectedCard
            //     });
            // })

            .addCase(fetchCardById.fulfilled, (state, action) => {
                // state.selectedCard = action.payload; // FullCard
                state.selectedCard = {
                    ...action.payload,
                    checklists: action.payload.checklists ?? [],
                };

            })

            .addCase(updateCard.fulfilled, (state, action) => {
                const updated = action.payload;

                if (state.selectedCard?.id === updated.id) {
                    state.selectedCard = {
                        ...state.selectedCard,
                        ...updated,
                        checklists: state.selectedCard?.checklists, // 🔥 KEEP
                    };
                }


                const index = state.cards.findIndex(c => c.id === updated.id);
                if (index !== -1) {
                    state.cards[index] = {
                        ...state.cards[index],
                        ...updated,
                    };
                }
            })


            // .addCase(completeCard.fulfilled, (state, action) => {
            //     const card = state.cards.find(c => c.id === action.payload.id);
            //     if (card) {
            //         card.isCompleted = true;
            //         card.reminderSent = true;
            //     }

            //     if (state.selectedCard && state.selectedCard.id === action.payload.id) {
            //         state.selectedCard.isCompleted = true;
            //     }
            // })
            .addCase(toggleCardComplete.fulfilled, (state, action) => {
                const updated = action.payload;

                // Update board cards
                const card = state.cards.find(c => c.id === updated.id);
                if (card) {
                    card.isCompleted = updated.isCompleted;
                }

                // ✅ SAFE selectedCard update
                if (state.selectedCard && state.selectedCard.id === updated.id) {
                    state.selectedCard.isCompleted = updated.isCompleted;
                }
            })

            .addCase(addMemberToCard.fulfilled, (state, action) => {
                const updatedCard = action.payload;

                // Update board card
                const card = state.cards.find(c => c.id === updatedCard.id);
                if (card) {
                    card.members = updatedCard.members;
                }

                // Update modal card
                if (state.selectedCard && state.selectedCard.id === updatedCard.id) {
                    state.selectedCard.members = updatedCard.members;
                }
            })


            /* MOVE BETWEEN LISTS */
            .addCase(moveCardThunk.fulfilled, (state, action) => {
                const moved = action.payload;
                const card = state.cards.find(c => c.id === moved.id);
                if (card) {
                    card.listId = moved.list.id;
                }
            })

            .addCase(deleteChecklist.fulfilled, (state, action) => {
                if (!state.selectedCard?.checklists) return;

                const checklistId = action.payload;

                state.selectedCard.checklists =
                    state.selectedCard.checklists.filter(
                        (c) => c.id !== checklistId
                    );
            });



    },


});

export const {
    reorderCards,
    setSelectedCard,
    clearSelectedCard,
} = cardSlice.actions;

export default cardSlice.reducer;
