export function formatDueDate(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}
