export interface Card {
    id: number;
    title: string;
    description: string | null;
    dueDate: string | null;
    labels: string[];
    listId: number;
    position: number;
}


export interface CardState {
    cards: Card[]
     
        loading: boolean;
        error: string | null;
}
export interface SaveCardOrderPayload {
    listId: number;          // Which list was reordered
    orderedCardIds: number[]; // New order of cards in that list
}
