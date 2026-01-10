import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addMemberToCard, fetchBoardMembers } from "../../member/memberThunk";
import { useDebounce } from "../../../hooks/useDebounce";


export default function CardMembers({ cardId, boardId, cardMembers }: any) {
    const dispatch = useAppDispatch();
    const boardMembers = useAppSelector(
        (state) => state.members.boardMembers
    );

    const [search, setSearch] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        dispatch(fetchBoardMembers(boardId));
    }, [boardId, dispatch]);

    const filteredMembers = boardMembers
        .filter((user: any) =>
            user.FullName
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase())
        )
        .filter(
            (user: any) =>
                !cardMembers.some((m: any) => m.id === user.id)
        );

    

    return (
        <div className="relative">
            {/* <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search members"
                className="w-full border px-3 py-2 rounded"
            /> */}

            <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search members"
                className="w-full border px-3 py-2 rounded"
            />

            {/* 🔥 SEARCH RESULT DROPDOWN */}
            {showDropdown && filteredMembers.length > 0 && (
                <div className="absolute w-full bg-white border rounded shadow mt-1 z-10">
                    {filteredMembers.map((user: any) => (
                        <div
                            key={user.id}
                            onClick={() => {
                                dispatch(
                                    addMemberToCard({
                                        cardId,
                                        userId: user.id,
                                    })
                                );
                                setSearch("");
                                setShowDropdown(false);
                            }}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                        >
                            <div className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                                {user.FullName[0]}
                            </div>
                            <span>{user.FullName}</span>
                        </div>
                    ))}
                </div>)}
                </div>
            )
            }
