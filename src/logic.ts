import { TemperatureChange, type ExtendedClimateChangeData, type ClimateChangeData, type TemperatureChangeData, ClimateChange, ExtendedClimateChange } from './model';
import { isDateString, isTimeString, isHumidityString, parseDateString, parseTimeString } from './utils';

type ModelData = TemperatureChangeData | ClimateChangeData | ExtendedClimateChangeData;

function throwInvalidInputError() {
  throw new Error('Invalid input');
}

function parseProperties(properties: string[]): ModelData {
  const data: ModelData = {};

  for (const property of properties) {
    if (isDateString(property)) {
      data.date = parseDateString(property);
      continue;
    }

    if (isTimeString(property)) {
      (data as ExtendedClimateChangeData).time = parseTimeString(property);
      continue;
    }

    if (property.startsWith('"') && property.endsWith('"')) {
      const actualValue = property.replaceAll('"', '');
      if (!actualValue) throwInvalidInputError();

      if (isHumidityString(actualValue)) {
        (data as ClimateChangeData).humidity = actualValue;
      } else {
        data.location = actualValue;
      }

      continue;
    }

    const value = Number(property);
    if (isNaN(value)) throwInvalidInputError();
    else {
      data.value = value;
    }
  }

  return data;
}

export function parseInputString(input: string): TemperatureChange {
  const rawProperties = input.split('  ').map(m => m.trim()).filter(Boolean);
  if (rawProperties.length === 0) throwInvalidInputError();

  return parseProperties(rawProperties);
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
