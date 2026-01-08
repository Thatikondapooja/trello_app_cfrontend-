import { useEffect, useState } from "react";
import { Card } from "./types";
import { completeCard, updateCard } from "./cardThunks";
import { useAppDispatch } from "../../../app/hooks";
import { addActivity } from "../../activity/activitySlice";

/* Label colors */
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
    const [dueDate, setDueDate] = useState(card.dueDate?.slice(0, 10) ?? "");
    const [dueTime, setDueTime] = useState("18:00");
    const [reminderMinutes, setReminderMinutes] = useState<number>(
        card.reminderMinutes ?? 0
    );
    const [labels, setLabels] = useState(card.labels ?? []);

    /* Save description */
    const saveDescription = () => {
        dispatch(updateCard({ id: card.id, data: { description } }));
        dispatch(addActivity({
            id: Date.now().toString(),
            message: "Description updated",
            timestamp: Date.now(),
        }));
    };

    /* Save due date + time */
    const saveDueDate = () => {
        if (!dueDate) return;

        dispatch(updateCard({
            id: card.id,
            data: {
                dueDate: `${dueDate}T${dueTime}`,
                reminderMinutes: reminderMinutes === 0 ? null : reminderMinutes,
            },
        }));
    };

    /* Toggle labels */
    const toggleLabel = (label: { name: string; color: string }) => {
        const exists = labels.some(l => l.name === label.name);
        const updated = exists
            ? labels.filter(l => l.name !== label.name)
            : [...labels, label];

        setLabels(updated);
        dispatch(updateCard({ id: card.id, data: { labels: updated } }));
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[500px] p-6 shadow-xl">

                {/* Header */}
                <div className="flex justify-between mb-4">
                    <h2 className="font-bold">{card.title}</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                {/* Description */}
                <textarea
                    className="w-full border p-2 rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={saveDescription}
                    placeholder="Add description..."
                />

                {/* Due Date */}
                <div className="flex gap-2 mt-3">
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="border px-2 py-1 rounded"
                    />
                    <input
                        type="time"
                        value={dueTime}
                        onChange={(e) => setDueTime(e.target.value)}
                        className="border px-2 py-1 rounded"
                    />
                </div>

                {/* Reminder */}
                <select
                    className="border px-2 py-1 mt-2 rounded"
                    value={reminderMinutes}
                    onChange={(e) => setReminderMinutes(Number(e.target.value))}
                >
                    <option value={0}>No reminder</option>
                    <option value={1440}>1 day before</option>
                    <option value={60}>1 hour before</option>
                    <option value={1}>1 minute before</option>
                </select>

                <button
                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={saveDueDate}
                >
                    Save Due Date
                </button>

                {/* Complete */}
                <label className="flex gap-2 mt-4">
                    <input
                        type="checkbox"
                        checked={card.isCompleted}
                        onChange={() => dispatch(completeCard(card.id))}
                    />
                    Mark as complete
                </label>

                {/* Labels */}
                <h4 className="mt-4 font-semibold">Labels</h4>
                <div className="flex gap-2 flex-wrap mt-2">
                    {LABEL_PRESETS.map(label => (
                        <button
                            key={label.name}
                            onClick={() => toggleLabel(label)}
                            className={`${LABEL_COLORS[label.color]} px-3 py-1 text-xs rounded text-white ${labels.some(l => l.name === label.name)
                                    ? "opacity-100"
                                    : "opacity-40"
                                }`}
                        >
                            {label.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
