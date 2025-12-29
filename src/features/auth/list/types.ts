export interface List {
    id: number;
    title: string;
    boardId: number;
}

export interface ListsState {
    lists: List[];
    loading: boolean;
    error: string | null;
}
