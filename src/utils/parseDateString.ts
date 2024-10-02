export default function parseDateString(dateString: string): Date {
  const [year, month, day] = dateString.split('.').map(value => parseInt(value, 10));
  return new Date(year, month - 1, day);
}
