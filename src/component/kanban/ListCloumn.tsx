import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { BoardCard } from "../../features/auth/card/types";
import TaskCard from "../TaskCard";

interface Props {
    listId: number;
    title: string;
    cards: BoardCard[];
    cardTitles: Record<number, string>;
    setCardTitles: React.Dispatch<React.SetStateAction<Record<number, string>>>;
    onAddCard: (listId: number) => void;
    onCardClick: (cardId: number) => void;

}

export default function ListColumn({
    listId,
    title,
    cards,
    cardTitles,
    setCardTitles,
    onAddCard,
    onCardClick,
}: Props) {
    const { setNodeRef } = useDroppable({
        id: listId,
        data: {
            type: "LIST",
            listId,
        },
    });

    return (
        <div ref={setNodeRef} className="w-72 bg-indigo-50 rounded-xl p-3 shadow">
            <h2 className="font-semibold mb-3">{title}</h2>

            <SortableContext
                items={cards.map((c) => c.id)} // ✅ CRITICAL
                strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-col gap-2">
                    {cards.map((card) => (
                        <TaskCard key={card.id} card={card} onClick={onCardClick
                        } />
                    ))}
                </div>
            </SortableContext>

            <button
                onClick={() => onAddCard(listId)}
                className="mt-3 text-sm text-gray-600"
            >
                + Add card
            </button>
        </div>
    );
}
