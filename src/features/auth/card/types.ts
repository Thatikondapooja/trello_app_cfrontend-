import { LabelColor } from "./label.types";

export interface Label {
  name: string;
  color: LabelColor;
}


/* ---------- Checklist ---------- */
export interface ChecklistItem {
  id: number;
  text: string;
  isCompleted: boolean;
}

export interface Checklist {
  id: number;
  title: string;
  items: ChecklistItem[];
}

/* ---------- Card shown on board ---------- */
export interface BoardCard {
  
  id: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  reminderMinutes: number | null;
  isCompleted: boolean;
  labels: Label[];
  listId: number;
  position:number;
  reminderSent:boolean;
  selectedCard:null,
  members?: {
    id: number;
    FullName: string;
  }[];


  checklistSummary?: {
    completed: number;
    total: number;
  } | null;
}


/* ---------- Full card (modal) ---------- */
export interface FullCard extends BoardCard {
  list?: {
    id: number;
    title: string;
    board?: {
      id: number;
    };
  };
  checklists: Checklist[];
  members?: {
    id: number;
    FullName: string;
    email: string;
  }[];
}

/* ---------- Redux ---------- */
export interface CardState {
  cards: BoardCard[];
  selectedCard: FullCard | null;
  loading: boolean;
  error: string | null;
}
export interface SaveCardOrderPayload {
    listId: number;          // Which list was reordered
    orderedCardIds: number[]; // New order of cards in that list
}
