export function formatDueDate(dateString: string) {
    if (!dateString) return "";

    // Parse as local time by replacing 'T' with ' ' and removing 'Z' if present
    // This prevents the browser from automatically converting it to local time from UTC
    const localDateString = dateString.replace('T', ' ').split('.')[0].replace('Z', '');
    const date = new Date(localDateString);

    // If invalid date, fallback to standard parsing
    if (isNaN(date.getTime())) {
        return new Date(dateString).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    }

    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}
