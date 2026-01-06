import { Interface } from "node:readline";

export  interface Label{
name:string;
color:string;
}


export interface Card {
    id: number;
    title: string;
    description: string | null;
    dueDate: string | null;
    labels: Label[];
    listId: number;
    position: number;
    reminderMinutes: number | null;
    isCompleted:boolean;
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
