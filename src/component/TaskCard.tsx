import { useSortable } from "@dnd-kit/sortable";
import { BoardCard } from "../features/auth/card/types";
import { Clock } from "lucide-react";
import { formatDueDate } from "../utils/FormateDate";
import Checklist from "../features/checklists/checklist";
import CardMemberAvatars from "../features/auth/card/CardMemberAvatars";
import { LabelColor } from "../features/auth/card/label.types";
import { Label } from "../features/auth/card/types";
const LABEL_COLORS: Record<LabelColor, string> = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    gray: "bg-gray-500",
};


interface Props{
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
    const checklistStats = card.checklistSummary ?? null;
    console.log("checklistStats", checklistStats)

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
            onClick={() => onClick(card.id)}   // ✅ CLICK WORKS
            className="bg-white p-3 rounded-lg shadow cursor-pointer"
        >
            {/* 🔹 Drag handle ONLY */}
            <div
                {...listeners}
                className="text-xs text-gray-400 cursor-grab mb-1"
            >
                ⠿ Drag
            </div>

                <div className="font-medium">{card.title}</div>
{/* 
            {card.checklistSummary && (
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded w-fit">
                    {card.checklistSummary.completed}/{card.checklistSummary.total}
                </div>
            )} */}

 
           {card.dueDate && (
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded w-fit">
                    <Clock size={12} />
                    {formatDueDate(card.dueDate)}
                </div>
            )}
            {card.reminderMinutes && card.dueDate && (
                <p className="text-sm text-gray-600 mt-2">
                    ⏰ Reminder set {card.reminderMinutes} minutes before due date
                </p>
            )}

            {/* <div className="flex gap-1 flex-wrap mt-1">
                {card.isCompleted && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Completed
                    </span>
                )}

            </div> */}


            <div className="flex gap-1 flex-wrap mt-1">
                {card.labels.map(label => (
                    <span
                        key={label.name}
                        className={`px-2 py-0.5 text-xs rounded text-white ${LABEL_COLORS[label.color]
                            }`}
                    >
                        {label.name}
                    </span>


                ))}
            </div>
            {card.dueDate && (
                <span
                    className={`text-xs px-2 py-1 rounded text-white ${card.isCompleted
                            ? "bg-green-500"
                            : new Date(card.dueDate) < new Date()
                                ? "bg-red-500"
                                : "bg-slate-400"
                        }`}
                >
                    {card.isCompleted ? "Completed" : formatDueDate(card.dueDate)}
                </span>
            )}

            {/* {card.members && card.members.length > 0 && (
               <div className="ml-52 mt-0"> 

                <CardMemberAvatars members={card.members}  />
             </div>
            )} */}


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
