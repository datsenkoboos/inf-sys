import { TemperatureChange, ExtendedClimateChangeData, ClimateChangeData, TemperatureChangeData, ClimateChange, ExtendedClimateChange } from './model';
import { isDateString, isTimeString, isHumidityString } from './utils';

type ModelData = TemperatureChangeData | ClimateChangeData | ExtendedClimateChangeData;

function parseDateString(dateString: string): Date {
  const [year, month, day] = dateString.split('.').map(value => parseInt(value, 10));
  return new Date(year, month - 1, day);
}

function parseTimeString(timeString: string): number {
  const [hour, minute] = timeString.split(':').map(value => parseInt(value, 10));
  const ms = (hour * 3600 + minute * 60) * 1000;
  return ms;
}

function parseMeasurements(measurements: string[]): ModelData {
  const data: ModelData = {};

  measurements.forEach((measurement) => {
    if (isDateString(measurement)) {
      data.date = parseDateString(measurement);
    } else if (isTimeString(measurement)) {
      (data as ExtendedClimateChangeData).time = parseTimeString(measurement);
    } else if (measurement.includes('"')) {
      if (isHumidityString(measurement)) {
        (data as ClimateChangeData).humidity = measurement.replaceAll('"', '');
      } else {
        data.location = measurement.replaceAll('"', '');
      }
    } else {
      data.value = parseFloat(measurement);
    }
  });

  return data;
}

export function parseInput(input: string): TemperatureChange {
  const rawMeasurements = input.split(' ').map(m => m.trim());

  let splitLocationStartIndex: number | null = null;
  for (let i = 0; i < rawMeasurements.length; i++) {
    const measurement = rawMeasurements[i];
    if (measurement.includes('"') && measurement.at(-1) !== '"') {
      splitLocationStartIndex = i;
      break;
    }
  }
  if (splitLocationStartIndex !== null) {
    const splitLocationEnd = rawMeasurements.splice(splitLocationStartIndex + 1, 1);
    rawMeasurements[splitLocationStartIndex] = `${rawMeasurements[splitLocationStartIndex]} ${splitLocationEnd}`;
  }

  return parseMeasurements(rawMeasurements);
}

function createTemperatureChangeInstance(data: TemperatureChangeData): TemperatureChange {
  return new TemperatureChange(data);
}

function createClimateChangeInstance(data: ClimateChangeData): ClimateChange {
  return new ClimateChange(data);
}

function createExtendedClimateChangeInstance(data: ExtendedClimateChangeData): ExtendedClimateChange {
  return new ExtendedClimateChange(data);
}

export function createChangeInstance(data: ModelData) {
  if ((data as ExtendedClimateChangeData).time) {
    return createExtendedClimateChangeInstance(data);
  }
  if ((data as ExtendedClimateChangeData).humidity) {
    return createClimateChangeInstance(data);
  }
  return createTemperatureChangeInstance(data);
}
