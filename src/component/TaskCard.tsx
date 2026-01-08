import { useSortable } from "@dnd-kit/sortable";
import { Card } from "../features/auth/card/types";
import { Clock } from "lucide-react";
import { formatDueDate } from "../utils/FormateDate";
import Checklist from "../features/checklists/checklist";

interface Props{
    card: Card;
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

           
            <div className="flex gap-1 flex-wrap mt-1">
                {card.labels.map(label => (
                    <span
                        key={label.name}
                        className={`px-2 py-0.5 text-xs rounded text-white bg-${label.color}-500`}
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
                    {card.isCompleted ? "Completed" : "Due"}
                </span>
            )}

         


            </div>

       
    );
}
