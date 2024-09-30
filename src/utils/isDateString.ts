export default function isDateString(str: string) {
  const DATE_REGEXP = /^\d{4}\.\d{2}\.\d{2}$/;
  return DATE_REGEXP.test(str);
}
