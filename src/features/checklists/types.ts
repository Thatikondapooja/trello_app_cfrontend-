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
