interface Member {
    id: number;
    FullName: string;
}

export default function CardMemberAvatars({
    members = [],
}: {
    members?: Member[];
}) {
    if (!members.length) return null;

    const visible = members.slice(0, 3);
    const remaining = members.length - visible.length;

    return (
        <div className="flex items-center gap-1 mt-2">
            {visible.map((m) => (
                <div
                    key={m.id}
                    className="w-6 h-6 rounded-full bg-indigo-300 text-white text-xs flex items-center justify-center font-semibold"
                    title={m.FullName}
                >
                    {m.FullName[0].toUpperCase()}
                </div>
            ))}

            {remaining > 0 && (
                <div className="w-6 h-6 rounded-full bg-red-300 text-gray-700 text-xs flex items-center justify-center">
                    +{remaining}
                </div>
            )}
        </div>
    );
}
