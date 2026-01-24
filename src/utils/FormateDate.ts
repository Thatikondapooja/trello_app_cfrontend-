export function formatDueDate(dateString: string) {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Always use UTC parts to match what was saved
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return `${month} ${day}, ${hours}:${minutesStr} ${ampm}`;
}
