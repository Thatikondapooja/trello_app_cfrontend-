import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "../features/auth/card/types";

export default function TaskCard({ card }: { card: Card }) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
    } = useSortable({
        id: card.id, // 🔥 IMPORTANT: pure ID, not `card-${id}`
        data: {
            type: "CARD",
            cardId: card.id,
            listId: card.listId,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-3 rounded-lg shadow cursor-grab active:cursor-grabbing"
        >
            {card.title}
        </div>
    );
}
