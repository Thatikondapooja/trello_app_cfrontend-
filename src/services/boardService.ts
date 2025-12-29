import api from "./api";

export interface CreateBoardPayload {
    title: string;
    description?: string;
}

export const createBoardApi = (data: CreateBoardPayload) => {
    console.log("CreateBoardPayload",data)
    return api.post("/boards", data);
};

export const fetchBoardsApi = () => {
    return api.get("/boards/getboards");
};
