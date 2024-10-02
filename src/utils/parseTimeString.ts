export default function parseTimeString(timeString: string): number {
  const [hour, minute] = timeString.split(':').map(value => parseInt(value, 10));
  const ms = (hour * 3600 + minute * 60) * 1000;
  return ms;
}
