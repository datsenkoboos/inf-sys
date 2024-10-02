import isTimeString from './isTimeString';
import { describe, test, expect } from 'vitest';

describe('isTimeString', () => {
  describe('should return false when string is invalid', () => {
    test.each([
      '',
      ':',
      '1:',
      ':1',
      '1:1',
      '10:1',
      '1:10',
      '100:10',
      '10:100',
    ])('"%s"', (str) => {
      expect(isTimeString(str)).toBe(false);
    });
  });

  describe('should return true when string is valid', () => {
    test.each([
      '10:10',
      '01:01',
    ])('"%s"', (str) => {
      expect(isTimeString(str)).toBe(true);
    });
  });
});
