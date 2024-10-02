import isHumidityString from './isHumidityString';
import { describe, test, expect } from 'vitest';

describe('isHumidityString', () => {
  describe('should return false when string is invalid', () => {
    test.each([
      '',
      '1',
      '10',
      '%',
      'g%',
      '1000%',
    ])('"%s"', (str) => {
      expect(isHumidityString(str)).toBe(false);
    });
  });

  describe('should return true when string is valid', () => {
    test.each([
      '1%',
      '10%',
      '100%',
    ])('"%s"', (str) => {
      expect(isHumidityString(str)).toBe(true);
    });
  });
});
