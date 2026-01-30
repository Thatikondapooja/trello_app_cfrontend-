import { useState, Dispatch, SetStateAction } from "react";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Button from "../../components/comman/Button";
import InputComponent from "../../components/comman/inputComponent";
import TaskCard from "../TaskCard";
import { BoardCard } from "../../features/auth/card/types";

interface ListColumnProps {
    listId: number;
    title: string;
    cards: BoardCard[];
    cardTitles: Record<string, string>;
    setCardTitles: Dispatch<SetStateAction<Record<string, string>>>;
    onAddCard: (listId: number) => void;
    onCardClick: (cardId: number) => void;
}

export default function ListCloumn({
    listId,
    title,
    cards,
    cardTitles,
    setCardTitles,
    onAddCard,
    onCardClick
}: ListColumnProps) {
    const [showAddCard, setShowAddCard] = useState(false);

    // ✅ LIST is sortable (and droppable)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: listId,
        data: {
            type: "LIST",
            listId,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="w-72 bg-indigo-100/50 rounded-xl p-3 border-2 border-indigo-200 border-dashed min-h-[150px] shrink-0"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="w-72 bg-indigo-50 rounded-xl p-3 shadow flex flex-col shrink-0"
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-move pb-2"
            >
                <h2 className="font-semibold text-sm mb-1 text-gray-800">
                    {title}
                </h2>
            </div>

            {/* CARDS SORTABLE CONTEXT */}
            <SortableContext
                items={cards.map(c => c.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-col gap-2 mb-2 min-h-[10px]">
                    {cards.map((card) => (
                        <TaskCard
                            key={card.id}
                            card={card}
                            onClick={() => onCardClick(card.id)}
                        />
                    ))}
                </div>
            </SortableContext>

            {/* ADD CARD */}
            {showAddCard ? (
                <div className="mt-2 text-red-600 font-lato">
                    <InputComponent
                        value={cardTitles[listId] || ""}
                        onChange={(e) =>
                            setCardTitles((prev) => ({
                                ...prev,
                                [listId]: e.target.value,
                            }))
                        }
                        placeholder="Enter card title..."
                    />

                    <div className="flex gap-2 mt-2">
                        <Button onClick={() => { onAddCard(listId); setShowAddCard(false); }} className="bg-indigo-500 text-white hover:bg-indigo-700 py-2 rounded-xl transition-all">
                            Add Card
                        </Button>
                        <button onClick={() => setShowAddCard(false)}>✕</button>
                    </div>
                </div>
            ) : (
                <Button variant="ghost" onClick={() => setShowAddCard(true)}>
                    + Add card
                </Button>
            )}
        </div>
    );
}
