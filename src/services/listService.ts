import api from "./api";

export interface CreateListPayload {
    title: string;
    boardId?: number;
}

export const createListApi = (data: CreateListPayload) => {
    console.log("CreateListPayload", data)
    return api.post("/lists", data);
};

export const fetchListsApi = (boardId: number) => {
    return api.get(`/lists/boards/${boardId}`);
};
