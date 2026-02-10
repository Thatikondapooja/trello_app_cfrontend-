import { useSortable } from "@dnd-kit/sortable";
import { BoardCard } from "../features/auth/card/types";
import { Archive, Clock } from "lucide-react";
import { formatDueDate } from "../utils/FormateDate";
import CardMemberAvatars from "../features/auth/card/CardMemberAvatars";
import { LabelColor } from "../features/auth/card/label.types";
import { archiveCardThunk } from "../features/auth/card/cardThunks";
import { useAppDispatch } from "../app/hooks";
import { addActivity } from "../features/activity/activitySlice";
import { clearSelectedCard } from "../features/auth/card/cardSlice";

const LABEL_COLORS: Record<LabelColor, string> = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    gray: "bg-gray-500",
};


interface Props {
    card: BoardCard;
    onClick: (id: number) => void;
}

export default function TaskCard({ card, onClick }: Props) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
    } = useSortable({
        id: card.id,
        data: {
            type: "CARD",
            cardId: card.id,
            listId: card.listId,
        },
    });
    const dispatch = useAppDispatch();

    const checklistStats = card.checklistSummary ?? null;
    console.log("checklistStats", checklistStats)
    const handleArchive = () => {
        dispatch(archiveCardThunk(card.id));
        dispatch(
            addActivity({
                id: Date.now().toString(),
                message: `Card "${card.title}" archived`,
                timestamp: Date.now(),
            })
        );
        dispatch(clearSelectedCard());
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            style={{
                transform: transform
                    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                    : undefined,
                transition,
            }}
            onClick={() => onClick(card.id)} // ✅ CLICK WORKS
            className="bg-white p-3 rounded-lg shadow cursor-pointer"
        >
            {/* 🔹 Drag handle ONLY */}
            <div
                {...listeners}
                className="text-xs text-gray-400 cursor-grab mb-1"
            >
                ⠿ Drag
            </div>
            <div className="flex flex-row justify-between ">
                <div className="font-medium">{card.title}</div>
                <button onClick={(e) => {
                    e.stopPropagation();   // 🔥 THIS LINE FIXES EVERYTHING

                    handleArchive();
                }}>
                    <Archive className="text-gray-400 hover:text-gray-600 size-4" />
                </button>
            </div>

            <div className="flex gap-1 flex-wrap mt-1">
                {card.labels.map(label => (
                    <span
                        key={label.name}
                        className={`px-2 py-0.5 text-xs rounded text-white ${LABEL_COLORS[label.color]}`}
                    >
                        {label.name}
                    </span>
                ))}
            </div>

            {card.dueDate && (
                <div className="flex items-center gap-1.5 mt-3">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-bold tracking-wide transition-colors ${card.isCompleted
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : new Date(card.dueDate) < new Date()
                            ? "bg-rose-50 text-rose-700 border-rose-100"
                            : "bg-indigo-50 text-indigo-700 border-indigo-100"
                        }`}>
                        <Clock size={12} strokeWidth={2.5} />
                        <span>
                            {card.isCompleted ? "COMPLETED" : formatDueDate(card.dueDate).toUpperCase()}
                        </span>
                    </div>
                </div>
            )}

            {/* Status row (checklist + completed + members) */}
            <div className="flex items-center justify-between mt-2">
                {/* LEFT SIDE */}
                <div className="flex items-center gap-2 text-xs">
                    {card.checklistSummary && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {card.checklistSummary.completed}/{card.checklistSummary.total}
                        </span>
                    )}

                    {card.isCompleted && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                            Completed
                        </span>
                    )}
                </div>

                {/* RIGHT SIDE */}
                {card.members && card.members.length > 0 && (
                    <CardMemberAvatars members={card.members} />
                )}
            </div>
        </div>
    );
}
