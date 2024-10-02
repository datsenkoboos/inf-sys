import { parseDateString } from './parseDateString';
import { describe, test, expect } from 'vitest';

describe('parseDateString', () => {
  test('should return valid value', () => {
    expect(parseDateString('2024.09.02')).toStrictEqual(new Date(2024, 8, 2));
    expect(parseDateString('1999.01.12')).toStrictEqual(new Date(1999, 0, 12));
  });
});
