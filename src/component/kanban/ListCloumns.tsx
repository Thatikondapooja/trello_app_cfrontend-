import { useState, Dispatch, SetStateAction } from "react";
import { useDroppable } from "@dnd-kit/core";

import Button from "../../components/comman/Button";
import InputComponent from "../../components/comman/inputComponent";
import TaskCard from "../TaskCard";
import { Card } from "../../features/auth/card/types";

interface ListColumnProps {
    listId: string;
    title: string;
    cards: Card[];
    cardTitles: Record<string, string>;
    setCardTitles: Dispatch<SetStateAction<Record<string, string>>>;
    onAddCard: (listId: string) => void;
}

export default function ListColumn({
    listId,
    title,
    cards,
    cardTitles,
    setCardTitles,
    onAddCard,
}: ListColumnProps) {
    const [showAddCard, setShowAddCard] = useState(false);

    // 🔥 Make LIST droppable
    const { setNodeRef } = useDroppable({
        id: listId, // IMPORTANT: drop target id
    });

    return (
        <div
            ref={setNodeRef}
            className="w-72 bg-indigo-50 rounded-xl p-3 shadow flex flex-col"
        >
            {/* ===== LIST TITLE ===== */}
            <h2 className="font-semibold text-sm mb-3 text-gray-800">
                {title}
            </h2>

            {/* ===== CARDS ===== */}
            <div className="flex flex-col gap-2 mb-2">
                {cards.map((card) => (
                    <TaskCard
                        key={card.id}
                        id={card.id}       // 🔥 used for drag
                        title={card.title}
                    />
                ))}
            </div>

            {/* ===== ADD CARD SECTION ===== */}
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

                    <div className="flex items-center gap-2 mt-2">
                        <Button
                            onClick={() => {
                                onAddCard(listId);
                                setShowAddCard(false);
                            }}
                        >
                            Add Card
                        </Button>

                        <button
                            onClick={() => setShowAddCard(false)}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                <Button
                    variant="ghost"
                    onClick={() => setShowAddCard(true)}
                >
                    + Add card
                </Button>
                </div>
            )}
        </div>
    );
}
