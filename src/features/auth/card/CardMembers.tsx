import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    fetchBoardMembers,
    addMemberToCard,
} from "../../member/memberThunk";

interface Props {
    cardId: number;
    boardId: number;
    cardMembers: any[];
    onClose: () => void;
}

export default function CardMembers({
    cardId,
    boardId,
    cardMembers,
    onClose,
}: Props) {
    const dispatch = useAppDispatch();
    const boardMembers = useAppSelector(
        (state) => state.members.boardMembers
    );
    console.log("boardMembers", boardMembers)

    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchBoardMembers(boardId));
    }, [boardId, dispatch]);

    const filteredMembers = boardMembers
        .filter((u: any) =>
            u.FullName.toLowerCase().includes(search.toLowerCase())
        )
        .filter((u: any) => !cardMembers.some((m) => m.id === u.id));
    console.log("filteredMembers", filteredMembers)
    return (
        <div className="bg-white border rounded shadow w-64 p-2">
            <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold">Add members</span>
                <button onClick={onClose}>✕</button>
            </div>

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search members"
                className="w-full border px-2 py-1 text-sm rounded"
            />

            {search && filteredMembers.length > 0 && (
                <div className="mt-2 max-h-40 overflow-y-auto">
                    {filteredMembers.map((user: any) => (
                        <div
                            key={user.id}
                            onClick={() => {
                                dispatch(addMemberToCard({ cardId, userId: user.id }));
                                setSearch("");
                                onClose();
                            }}
                            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer"
                        >
                            <div className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                                {user.FullName[0]}
                            </div>
                            <span className="text-sm">{user.FullName}</span>
                        </div>
                    ))}
                </div>
            )}

            {search && filteredMembers.length === 0 && (
                <p className="text-xs text-gray-400 mt-2">No results</p>
            )}
        </div>
    );
}
