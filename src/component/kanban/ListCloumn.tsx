import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "../TaskCard";
import { Dispatch, SetStateAction, useState } from "react";
import { Card } from "../../features/auth/card/types";

interface Props {
    listId: number;
    title: string;
    cards: Card[];
    cardTitles: Record<string, string>;
    setCardTitles: Dispatch<SetStateAction<Record<number, string>>>;
    onAddCard: (listId: number) => void;
}

const ListColumn = ({
    listId,
    title,
    cards,
    cardTitles,
    setCardTitles,
    onAddCard,
}: Props) => {
    const { setNodeRef, isOver } = useDroppable({
        id: listId,
        data: {
            type: 'list',
            accepts: ['card']
        }
    });

    const [showInput, setShowInput] = useState(false);

    return (
        <div className="shrink-0 w-[300px]">
            <div className={`
                bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg 
                border border-white/20 overflow-hidden
                transition-all duration-200
                ${isOver ? 'ring-2 ring-purple-400 ring-offset-2 scale-105' : ''}
            `}>
                <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-800">{title}</h3>
                        <span className="text-xs bg-white/80 text-gray-600 px-2.5 py-1 rounded-full font-semibold">
                            {cards.length}
                        </span>
                    </div>
                </div>

                <div
                    ref={setNodeRef}
                    className="p-3 space-y-2 min-h-[200px] max-h-[calc(100vh-300px)] overflow-y-auto"
                >
                    <SortableContext
                        items={cards.map((c) => c.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {cards.map((card) => (
                            <TaskCard
                                key={card.id}
                                id={card.id}
                                title={card.title}
                            />
                        ))}
                    </SortableContext>

                    {/* Add Card Section */}
                    {showInput ? (
                        <div className="bg-white rounded-xl p-3 shadow-md border-2 border-purple-300 mt-2">
                            <input
                                type="text"
                                value={cardTitles[listId] || ""}
                                onChange={(e) =>
                                    setCardTitles((prev) => ({
                                        ...prev,
                                        [listId]: e.target.value,
                                    }))
                                }
                                placeholder="Enter card title..."
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                                autoFocus
                            />
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => {
                                        onAddCard(listId);
                                        setShowInput(false);
                                    }}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                                >
                                    Add
                                </button>
                                <button
                                    onClick={() => setShowInput(false)}
                                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-all"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowInput(true)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all flex items-center gap-2 group mt-2"
                        >
                            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add card
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListColumn;