import TemperatureChange, { TemperatureChangeData } from './model';
import { isDateString } from './utils';

function parseDateString(dateString: string): Date {
  const [year, month, day] = dateString.split('.').map(value => parseInt(value, 10));
  console.log(year, month, day);
  return new Date(year, month - 1, day);
}

function parseMeasurements(measurements: string[]): TemperatureChangeData {
  const data: TemperatureChangeData = {};

  measurements.forEach((measurement) => {
    if (isDateString(measurement)) {
      data.date = parseDateString(measurement);
    } else if (measurement.includes('"')) {
      data.location = measurement.replaceAll('"', '');
    } else {
      data.value = parseFloat(measurement);
    }
  });

  return data;
}

export function parseInput(input: string): TemperatureChange {
  // date string float
  // date string
  // date float
  // string float
  const rawMeasurements = input.split(' ').map(m => m.trim());
  return parseMeasurements(rawMeasurements);
}

export function createTemperatureChangeInstance(data: TemperatureChangeData): TemperatureChange {
  return new TemperatureChange(data);
}
