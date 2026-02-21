export function formatTime(ts: number) {
  const date = new Date(ts);
  const now = new Date();

  const sameDay = date.toDateString() === now.toDateString();
  const sameYear = date.getFullYear() === now.getFullYear();

  if (sameDay)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (sameYear)
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return date.toLocaleString();
}