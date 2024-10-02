export default function isHumidityString(str: string) {
  const HUMIDITY_REGEXP = /^(\d{1,3})%$/;
  return HUMIDITY_REGEXP.test(str);
}
