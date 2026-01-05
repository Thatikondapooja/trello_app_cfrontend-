export function formatDueDate(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        month: "short", // Jan, Feb, Mar
        day: "numeric", // 28
    });
}
