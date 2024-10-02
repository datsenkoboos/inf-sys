import { TemperatureChange, type ExtendedClimateChangeData, type ClimateChangeData, type TemperatureChangeData, ClimateChange, ExtendedClimateChange } from './model';
import { isDateString, isTimeString, isHumidityString, parseDateString, parseTimeString } from './utils';

type ModelData = TemperatureChangeData | ClimateChangeData | ExtendedClimateChangeData;

function parseMeasurements(measurements: string[]): ModelData {
  const data: ModelData = {};

  for (const measurement of measurements) {
    if (isDateString(measurement)) {
      data.date = parseDateString(measurement);
      continue;
    }

    if (isTimeString(measurement)) {
      (data as ExtendedClimateChangeData).time = parseTimeString(measurement);
      continue;
    }

    if (measurement.includes('"')) {
      const actualValue = measurement.replaceAll('"', '');
      if (isHumidityString(actualValue)) {
        (data as ClimateChangeData).humidity = measurement.replaceAll('"', '');
      } else {
        data.location = measurement.replaceAll('"', '');
      }
      continue;
    }

    data.value = parseFloat(measurement);
  }

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

export function createModelInstance(data: ModelData) {
  if ((data as ExtendedClimateChangeData).time) {
    return createExtendedClimateChange(data);
  }
  if ((data as ExtendedClimateChangeData).humidity) {
    return createClimateChange(data);
  }
  return createTemperatureChange(data);
}

function createExtendedClimateChange(data: ExtendedClimateChangeData): ExtendedClimateChange {
  return new ExtendedClimateChange(data);
}

function createClimateChange(data: ClimateChangeData): ClimateChange {
  return new ClimateChange(data);
}

function createTemperatureChange(data: TemperatureChangeData): TemperatureChange {
  return new TemperatureChange(data);
}
