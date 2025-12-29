import { useAppSelector } from "../../app/hooks";

export default function ActivityLog() {
    const activities = useAppSelector(
        (state) => state.activity.activities
    );

    return (
        <div className="space-y-3">
            {/* Empty state */}
            {activities.length === 0 && (
                <p className="text-sm text-blue-500 text-center mt-6">
                    No activity yet
                </p>
            )}

            {/* Activity items */}
            {activities.map((activity, index) => (
                <div
                    key={index}
                    className="flex gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-200 hover:shadow-md transition"
                >
                    {/* Timeline Dot */}
                    <div className="mt-1 w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />

                    {/* Content */}
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-800 font-medium">
                            {activity.message}
                        </p>

                        {/* <p className="text-xs text-gray-500 mt-1">
                            {new Date(activity.timestamp).toLocaleString()}
                        </p> */}
                    </div>
                </div>
            ))}
        </div>
    );
}
