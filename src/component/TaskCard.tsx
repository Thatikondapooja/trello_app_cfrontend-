import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    id: number;
    title: string;
}

const TaskCard = ({ id, title }: Props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id,
        data: {
            type: 'card',
            card: { id, title }
        }
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
            className={`
                bg-white rounded-xl p-3 shadow-sm 
                hover:shadow-md transition-all 
                cursor-grab active:cursor-grabbing 
                border border-gray-100 hover:border-purple-200 
                group
                ${isDragging ? 'mb-2 opacity-30' : 'opacity-100'}
            `}
        >
            <p className="text-sm text-gray-700 font-medium group-hover:text-purple-600 transition-colors">
                {title}
            </p>
        </div>
    );
};

export default TaskCard;