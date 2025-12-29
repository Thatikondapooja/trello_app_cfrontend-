

export interface Card {
    id: number;
    listId: number;
    title: string;
    description?: string;

}

export interface CardState {
    cards: Card[]
     
        loading: boolean;
        error: string | null;
}