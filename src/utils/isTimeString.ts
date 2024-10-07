export default function isTimeString(str: string) {
  const TIME_REGEXP = /^\d{2}:\d{2}$/;
  return TIME_REGEXP.test(str);
}
