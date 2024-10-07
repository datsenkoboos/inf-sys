import { describe, test, expect } from 'vitest';
import { createModelInstance, parseInputString } from './logic';
import { parseDateString, parseTimeString } from './utils';
import { ClimateChange, ExtendedClimateChange, TemperatureChange, type ExtendedClimateChangeData } from './model';

describe('parseInputString', () => {
  test('should throw invalid input error if input does not contain any properties', () => {
    expect(() => parseInputString('   ')).toThrow('Invalid input');
  });

  test('should throw invalid input error if properties are separated with single space', () => {
    const input = '2019.08.14 "Nizhniy Novgorod" 14.5 "5%" 08:20';

    expect(() => parseInputString(input)).toThrow('Invalid input');
  });

  describe('should throw invalid input error if property does not match any valid format', () => {
    test.each([
      '2030.08.148',
      'Nizhniy Novgorod',
      '5%',
      '22:2',
    ])('%s', (input) => {
      expect(() => parseInputString(input)).toThrow('Invalid input');
    });
  });

  describe('should return parsed data if input is valid', () => {
    test.each([
      {
        input: '1999.01.14',
        expectedData: {
          date: parseDateString('1999.01.14'),
        },
      },
      {
        input: '"Verhniy Tagil"',
        expectedData: {
          location: 'Verhniy Tagil',
        },
      },
      {
        input: '29.45',
        expectedData: {
          value: 29.45,
        },
      },
      {
        input: '"4%"',
        expectedData: {
          humidity: '4%',
        },
      },
      {
        input: '22:19',
        expectedData: {
          time: parseTimeString('22:19'),
        },
      },
      {
        input: '2019.08.14  "Nizhniy Novgorod"  14.5  "5%"  08:20',
        expectedData: {
          date: parseDateString('2019.08.14'),
          location: 'Nizhniy Novgorod',
          value: 14.5,
          humidity: '5%',
          time: parseTimeString('08:20'),
        },
      },
    ])('$input', ({ input, expectedData }) => {
      expect(parseInputString(input)).toStrictEqual(expectedData);
    });
  });
});

describe('createModelInstance', () => {
  test('should create extended climate change if data.time is present', () => {
    const data: ExtendedClimateChangeData = {
      date: parseDateString('2019.08.14'),
      location: 'Nizhniy Novgorod',
      value: 14.5,
      humidity: '5%',
      time: parseTimeString('08:20'),
    };

    expect(createModelInstance(data)).toStrictEqual(new ExtendedClimateChange(data));
  });

  test('should create climate change if data.humidity is present and data.time is not', () => {
    const data: ExtendedClimateChangeData = {
      date: parseDateString('2019.08.14'),
      location: 'Nizhniy Novgorod',
      value: 14.5,
      humidity: '5%',
    };

    expect(createModelInstance(data)).toStrictEqual(new ClimateChange(data));
  });

  test('should create temperature change if data.humidity and data.time are not present', () => {
    const data: ExtendedClimateChangeData = {
      date: parseDateString('2019.08.14'),
      location: 'Nizhniy Novgorod',
      value: 14.5,
    };

    expect(createModelInstance(data)).toStrictEqual(new TemperatureChange(data));
  });
});
