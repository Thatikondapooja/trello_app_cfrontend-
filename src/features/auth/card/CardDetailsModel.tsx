import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import {  toggleCardComplete, updateCard } from "./cardThunks";
import { addActivity } from "../../activity/activitySlice";
import Checklist from "../../checklists/checklist";
import { createChecklist } from "../../checklists/checklistThunk";
import CardMembers from "./CardMembers";
import { FullCard, Label } from "./types";
import { LabelColor } from "./label.types";
import CardMemberAvatars from "./CardMemberAvatars";


/* Label colors */
const LABEL_COLORS: Record<LabelColor, string> = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    gray: "bg-gray-500",
};


const LABEL_PRESETS: { name: string; color: LabelColor } [] = [
    { name: "Bug", color: "red" },
    { name: "Urgent", color: "orange" },
    { name: "Frontend", color: "blue" },
    { name: "Backend", color: "green" },
    { name: "Low Priority", color: "gray" },
];


interface Props {
    card: FullCard;
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

    // const [showChecklistInput, setShowChecklistInput] = useState(false);
    const [checklistTitle, setChecklistTitle] = useState("");
    // const [showMemberSearch, setShowMemberSearch] = useState(false);

    type ActivePopover = "checklist" | "member" | null;

    const [activePopover, setActivePopover] = useState<ActivePopover>(null);

    /* Save description */
    const saveDescription = () => {
        dispatch(updateCard({ id: card.id, data: { description } }));
        dispatch(
            addActivity({
                id: Date.now().toString(),
                message: "Description updated",
                timestamp: Date.now(),
            })
        );
    };

    /* Save due date */
    const saveDueDate = () => {
        if (!dueDate) return;

        dispatch(
            updateCard({
                id: card.id,
                data: {
                    dueDate: `${dueDate}T${dueTime}`,
                    reminderMinutes: reminderMinutes === 0 ? null : reminderMinutes,
                },
            })
        );
    };

    /* Toggle labels */
    const toggleLabel = (label: Label) => {
        const exists = labels.some((l) => l.name === label.name);

        const updated: Label[] = exists
            ? labels.filter((l) => l.name !== label.name)
            : [...labels, label];

        setLabels(updated);
        dispatch(updateCard({ id: card.id, data: { labels: updated } }));
    };


    const addChecklist = () => {
        if (!checklistTitle.trim()) return;

        dispatch(
            createChecklist({
                cardId: card.id,
                title: checklistTitle,
            })
        );
        setActivePopover("checklist")
        setChecklistTitle("");
 
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[900px] p-6 shadow-xl">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <label className="flex gap-2 items-center">
                        <input
                            type="checkbox"
                            checked={card.isCompleted}
                            onChange={() => dispatch(toggleCardComplete(card.id))}

                        />
                        <h2 className="font-bold text-lg">{card.title}</h2>
                    </label>
                  
                    
                
                <div className="flex gap-4 items-center">
                    {card.members && card.members.length > 0 && (
                        <CardMemberAvatars members={card.members} />
                    )}
                    <button onClick={onClose} className="text-xl mt-1">✕</button>

                </div> 
                </div>
                {/* Description */}
                <textarea
                    className="w-full border p-2 rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={saveDescription}
                    placeholder="Add description..."
                />

                {/* Toolbar */}
                <div className="flex flex-wrap gap-2 mt-3 items-center">
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="border h-9 px-2 rounded text-sm"
                    />

                    <input
                        type="time"
                        value={dueTime}
                        onChange={(e) => setDueTime(e.target.value)}
                        className="border h-9 px-2 rounded text-sm"
                    />

                    <select
                        value={reminderMinutes}
                        onChange={(e) => setReminderMinutes(Number(e.target.value))}
                        className="border h-9 px-2 rounded text-sm"
                    >
                        <option value={0}>No reminder</option>
                        <option value={1440}>1 day before</option>
                        <option value={60}>1 hour before</option>
                        <option value={1}>1 minute before</option>
                    </select>

                    <button
                        onClick={saveDueDate}
                        className="h-9 text-sm bg-indigo-50 text-gray-600 px-3 rounded"
                    >
                        Save Due Date
                    </button>

                    {/* Add checklist */}
                    <div className="relative">
                        <button
                            onClick={() => setActivePopover("checklist")}
                            className="h-9 text-sm bg-indigo-50 text-gray-600 px-3 rounded"
                        >
                            + Add checklist
                        </button>

                        {activePopover === "checklist" && (
                            <div className="absolute top-full left-0 mt-2 bg-white border rounded shadow p-3 w-56 z-50">
                                <input
                                    className="border text-sm px-2 py-1 rounded w-full"
                                    placeholder="Checklist title"
                                    value={checklistTitle}
                                    onChange={(e) => setChecklistTitle(e.target.value)}
                                />
                                <div className="flex justify-between mt-3">
                                    <button
                                        onClick={addChecklist}
                                        className="bg-blue-500 text-sm text-white px-3 py-1 rounded"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => setActivePopover(null)}
                                        className="text-sm text-gray-500"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Add member */}
                    <div className="relative">
                        <button
                            onClick={() => setActivePopover("member")}
                            className="h-9 text-sm bg-indigo-50 text-gray-600 px-3 rounded"
                        >
                            + Add member
                        </button>

                        {activePopover === "member" && card.list?.board?.id && (
                            <div className="absolute top-full left-0 mt-2 z-50">
                                <CardMembers
                                    cardId={card.id}
                                    boardId={card.list.board.id}
                                    cardMembers={card.members ?? []}
                                    onClose={() => setActivePopover(null)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Labels */}
                <h4 className="mt-5 font-semibold">Labels</h4>
                <div className="flex gap-2 flex-wrap mt-2">
                    {LABEL_PRESETS.map((label) => (
                        <button
                            key={label.name}
                            onClick={() => toggleLabel(label)}
                            className={`${LABEL_COLORS[label.color]} px-3 py-1 text-xs rounded text-white ${labels.some((l) => l.name === label.name)
                                    ? "opacity-100"
                                    : "opacity-40"
                                }`}
                        >
                            {label.name}
                        </button>
                    ))}
                </div>

                {/* Checklists */}
                <div className="mt-4 max-h-[60vh] overflow-y-auto">
                    {card.checklists?.length === 0 && (
                        <p className="text-sm text-gray-400">No checklists yet</p>
                    )}

                    {card.checklists?.map((checklist) => (
                        <Checklist key={checklist.id} checklist={checklist} />
                    ))}
                </div>
            </div>
        </div>
    );
}
