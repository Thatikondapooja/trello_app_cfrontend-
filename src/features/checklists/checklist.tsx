import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addChecklistItem, deleteChecklist, toggleChecklistItem } from "./checklistThunk";

export default function Checklist({ checklist }: { checklist: any }) {
    const dispatch = useAppDispatch();
    const [text, setText] = useState("");

    const total = checklist.items.length;
    const completed = checklist.items.filter(
        (i: any) => i.isCompleted
    ).length;

    const percent =
        total === 0 ? 0 : Math.round((completed / total) * 100);

    function addItem() {
        if (!text.trim()) return;

        dispatch(
            addChecklistItem({
                checklistId: checklist.id,
                text,
            })
        );
        setText("");
    }

    return (
        <div className="mt-4 border rounded p-3 scroll">
            <div className="flex justify-between items-center">
                <h4 className="font-semibold">{checklist.title}</h4>

                <button
                    onClick={() => dispatch(deleteChecklist(checklist.id))}
                    className="text-xs text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            </div>

            <p className="text-xs text-gray-500">
                {completed}/{total} completed
            </p>

            {/* 🔥 Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                />
            </div>

            <p className="text-xs text-gray-500 mt-1">
                {percent}%
            </p>

            {/* Items */}
            {checklist.items.map((item: any) => (
                <div key={item.id} className="flex gap-2 mt-1">
                    <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() =>
                            dispatch(toggleChecklistItem(item.id))
                        }
                    />
                    <span
                        className={
                            item.isCompleted ? "line-through" : ""
                        }
                    >
                        {item.text}
                    </span>
                </div>
            ))}

            {/* Add item */}
            <div className="flex gap-2 mt-2">
                <input
                    className="border px-2 py-1 text-sm w-full"
                    placeholder="Add an item"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    onClick={addItem}
                    className="text-sm bg-blue-500 text-white px-2 rounded"
                >
                    Add
                </button>
            </div>
        </div>
    );
}
