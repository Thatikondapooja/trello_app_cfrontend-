export interface Board {
    id: number;
    title: string;
    description?: string;
}

export interface BoardState {
    boards: Board[];
    selectedBoardId: number | null;
}
