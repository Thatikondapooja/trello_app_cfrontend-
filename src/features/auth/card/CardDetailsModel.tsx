import { Card } from "./types";

interface Props {
    card: Card;
    onClose: () => void;
}

export default function CardDetailsModal({ card, onClose }: Props) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[500px] p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">{card.title}</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <textarea
                    className="w-full border rounded p-2"
                    placeholder="Add description..."
                    value={card.description ?? ""}
                />

                <p className="mt-3 text-sm text-gray-600">
                    Due: {card.dueDate ?? "No due date"}
                </p>

                <div className="flex gap-2 mt-2">
                    {card.labels.map(label => (
                        <span key={label} className="bg-slate-200 px-2 py-1 rounded text-xs">
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
