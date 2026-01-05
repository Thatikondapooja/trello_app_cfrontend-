import { useEffect, useState } from "react";
import { Card } from "./types";
import { updateCard } from "./cardThunks";
import { useAppDispatch } from "../../../app/hooks";

/* 🔹 Tailwind-safe color map */
const LABEL_COLORS: Record<string, string> = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    gray: "bg-gray-500",
};

const LABEL_PRESETS = [
    { name: "Bug", color: "red" },
    { name: "Urgent", color: "orange" },
    { name: "Frontend", color: "blue" },
    { name: "Backend", color: "green" },
    { name: "Low Priority", color: "gray" },
];

interface Props {
    card: Card;
    onClose: () => void;
}

export default function CardDetailsModal({ card, onClose }: Props) {
    const dispatch = useAppDispatch();

    const [description, setDescription] = useState(card.description ?? "");
    const [dueDate, setDueDate] = useState<string>(card.dueDate ?? "");
    const [reminderMinutes, setReminderMinutes] = useState<number>(
        card.reminderMinutes ?? 0
    );

    const [labels, setLabels] = useState<{ name: string; color: string }[] >(card.labels ?? []);

    useEffect(() => {
        setReminderMinutes(card.reminderMinutes ?? 0);
    }, [card.reminderMinutes]);

    
    /*  Update description */
    const handleDescriptionBlur = () => {
        if (description !== card.description) {
            dispatch(updateCard({
                id: card.id,
                data: { description },
            }));
        }
    };

    /*  Update due date */
    const handleDueDateBlur = () => {
        dispatch(updateCard({
            id: card.id,
            data: { dueDate: dueDate || null },
        }));
    };

    /*  Toggle label (Trello-style) */
    const toggleLabel = (label: { name: string; color: string }) => {
        const exists = labels.some(l => l.name === label.name);

        const updated = exists
            ? labels.filter(l => l.name !== label.name)
            : [...labels, label];

        setLabels(updated);

        dispatch(updateCard({
            id: card.id,
            data: { labels: updated },
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[500px] p-6 shadow-xl">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">{card.title}</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                {/* Description */}
                <textarea
                    className="w-full border rounded p-2"
                    placeholder="Add description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={handleDescriptionBlur}
                />

                {/* Due Date */}
                <div className="mt-3">
                    <label className="text-sm font-semibold block mb-1">
                        Due Date
                    </label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        onBlur={handleDueDateBlur}
                        className="border rounded px-2 py-1"
                    />
                    
                </div>

                <select
                    className="border rounded px-2 py-1 mt-2"
                    value={reminderMinutes}
                    onChange={(e) => {
                        const value = Number(e.target.value); // ✅ get NEW value

                        setReminderMinutes(value); // ✅ update UI

                        dispatch(updateCard({
                            id: card.id,
                            data: {
                                reminderMinutes: value === 0 ? null : value, // ✅ backend format
                            },
                        }));
                    }}
                >
                    <option value={0}>No reminder</option>
                    <option value={1440}>1 day before</option>
                    <option value={60}>1 hour before</option>
                    <option value={10}>10 minutes before</option>
                </select>



                {/* Labels */}
                <h4 className="mt-4 font-semibold text-sm">Labels</h4>

                <div className="flex gap-2 flex-wrap mt-2">
                    {LABEL_PRESETS.map(label => {
                        const isActive = labels.some(l => l.name === label.name);

                        return (
                            <button
                                key={label.name}
                                onClick={() => toggleLabel(label)}
                                className={`
                                    px-3 py-1 rounded text-xs font-semibold text-white
                                    ${LABEL_COLORS[label.color]}
                                    ${isActive ? "opacity-100" : "opacity-40"}
                                `}
                            >
                                {label.name}
                            </button>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
