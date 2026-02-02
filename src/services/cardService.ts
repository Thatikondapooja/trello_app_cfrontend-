import { BoardCard } from "../features/auth/card/types";
import api from "./api";

export const createCardApi = (data: {
    title: string;
    listId: number;
}) => {
    return api.post("/cards", data);
};

export const fetchCardsByListApi = (listId: number) => {
    return api.get(`/cards/list/${listId}`);
};

export const moveCardApi = (data: {
    cardId: number;
    toListId: number;
}) => {
    return api.patch(`/cards/${data.cardId}/move`, {
        toListId: data.toListId,
    });
}
export const saveCardOrderApi = (data: {
    listId: number;
    orderedCardIds: number[];
}) => {
    return api.patch("/cards/reorder", data);
};

export const updateCardApi = (
    id: number,
    payload: Partial<BoardCard>
) => {
    return api.patch(`/cards/${id}`, payload).then(res => res.data);
};



export const archiveCardAPI = (cardId: number) =>
    api.patch(`/cards/${cardId}/archive`);



export const restoreCardAPI = (cardId: number) =>
    api.patch(`/cards/${cardId}/restore`);

export const getArchivedCardsAPI = (boardId: number) =>
    api.get(`/cards/archived/${boardId}`)
