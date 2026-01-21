export function calculateCountdown(endTime) {
  const now = new Date();
  const diff = endTime - now;

  if (diff <= 0) {
    return {
      ended: true,
      display: "Election Ended",
    };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    ended: false,
    display: `${hours}h ${minutes}m ${seconds}s`,
    hours,
    minutes,
    seconds,
    totalMs: diff,
  };
}
