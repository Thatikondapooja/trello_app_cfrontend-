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
    cardId: string;
    toListId: string;
}) => {
    return api.patch(`/cards/${data.cardId}/move`, {
        toListId: data.toListId,
    });
};
