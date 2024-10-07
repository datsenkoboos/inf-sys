import isDateString from './isDateString';
import { describe, test, expect } from 'vitest';

describe('isDateString', () => {
  describe('should return false when string is invalid', () => {
    test.each([
      '',
      '.',
      '..',
      '1..',
      '.1.',
      '..1',
      '1.1.1',
      '10.1.1',
      '1.10.1',
      '1.1.10',
      '10.10.10',
      '100.10.10',
      '1000.10.1',
      '1000.1.10',
    ])('"%s"', (str) => {
      expect(isDateString(str)).toBeFalsy();
    });
  });

  describe('should return true when string is valid', () => {
    test.each([
      '1000.10.10',
      '1000.01.01',
    ])('"%s"', (str) => {
      expect(isDateString(str)).toBeTruthy();
    });
  });
});
