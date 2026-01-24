export function formatDueDate(dateString: string) {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}
