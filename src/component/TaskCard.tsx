import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "../features/auth/card/types";

interface Props {
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
            onClick={() => onClick(card.id)}   // ✅ THIS WAS MISSING
            className="bg-white p-3 rounded-lg shadow cursor-pointer hover:bg-slate-50"
        >
            {card.title}
        </div>
    );
}
