import parseTimeString from './parseTimeString';
import { describe, test, expect } from 'vitest';

describe('parseTimeString', () => {
  test('should return valid time in milliseconds', () => {
    expect(parseTimeString('00:01')).toBe(60000);
    expect(parseTimeString('00:10')).toBe(600000);
    expect(parseTimeString('01:00')).toBe(3600 * 1000);
    expect(parseTimeString('02:10')).toBe(2 * 3600 * 1000 + 600000);
  });
});
