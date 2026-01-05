import { useState, Dispatch, SetStateAction } from "react";
import { useDroppable } from "@dnd-kit/core";

import Button from "../../components/comman/Button";
import InputComponent from "../../components/comman/inputComponent";
import TaskCard from "../TaskCard";
import { Card } from "../../features/auth/card/types";

interface ListColumnProps {
    listId: number;
    title: string;
    cards: Card[];
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

    // ✅ LIST is droppable
    const { setNodeRef } = useDroppable({
        id: `list-${listId}`,
        data: {
            type: "LIST",
            listId,
        },
    });

  

    return (
        <div
            ref={setNodeRef}
            className="w-72 bg-indigo-50 rounded-xl p-3 shadow flex flex-col"
        >
            <h2 className="font-semibold text-sm mb-3 text-gray-800">
                {title}
            </h2>

            {/* CARDS */}
            <div className="flex flex-col gap-2 mb-2">
                {cards.map((card) => (
                    <TaskCard
                        key={card.id}
                        card={card}
                        onClick={() => onCardClick(card.id)} // ✅ IMPORTANT
                    />
                ))}
            </div>



            {/* ADD CARD */}
            {showAddCard ? (
                <div className="mt-2">
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
                        <Button onClick={() => { onAddCard(listId); setShowAddCard(false); }}>
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
