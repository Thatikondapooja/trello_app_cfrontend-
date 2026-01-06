export function getDueStatus(dueDate: string, isCompleted: boolean) {
    const now = new Date();
    const due = new Date(dueDate);

    if (isCompleted) return { color: "bg-green-500", text: "Completed" };

    if (due < now) return { color: "bg-red-500", text: "Overdue" };

    const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (diffHours <= 24) return { color: "bg-yellow-500", text: "Due Soon" };

    return { color: "bg-slate-300", text: due.toDateString() };
}
