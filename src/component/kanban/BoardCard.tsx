interface BoardCardProps {
    title: string;
   

}

export default function BoardCard({ title }: BoardCardProps) {
    return (
        <div
            className="
        w-56 h-28
        rounded-lg
        bg-[#026aa7]
        text-white
        p-4
        cursor-pointer
        hover:opacity-90
        transition
      "
        >
            <h3 className="font-semibold">{title}</h3>
        </div>
    );
}
