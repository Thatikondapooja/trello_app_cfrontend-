import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "../features/auth/card/types";

export default function TaskCard({ card }: { card: Card }) {
    const { setNodeRef, listeners, attributes, transform } = useDraggable({
        id: `card-${card.id}`,
        data: {
            type: "CARD",
            cardId: card.id,
            listId: card.listId,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="bg-white p-3 rounded-lg shadow cursor-grab active:cursor-grabbing"
        >
            {card.title}
        </div>
    );
}
