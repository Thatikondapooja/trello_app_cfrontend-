import { useAppDispatch } from "../../app/hooks";
import { toggleChecklistItem } from "./checklistThunk";

export default function Checklist({ checklist }: { checklist: any }) {
    const dispatch = useAppDispatch();
    const completed = checklist.items.filter((i: any) => i.isCompleted).length;

    console.log("completed", completed)

    return (
        <div className="mt-4">
            <h4 className="font-semibold">{checklist.title}</h4>

            {/* Progress */}
            <p className="text-xs text-gray-500">
                {completed}/{checklist.items.length} completed
            </p>

            {checklists.map(checklist => (
                <><Checklist key={checklist.id} checklist={checklist} /><label key={checklist.id} className="flex gap-2 mt-1">
                    <input
                        type="checkbox"
                        checked={checklist.isCompleted}
                        onChange={() => dispatch(toggleChecklistItem(checklist.id))} />
                    <span className={checklist.isCompleted ? "line-through" : ""}>
                        {checklist.text}
                    </span>
                </label></>
            ))}
        </div>
    );
}
