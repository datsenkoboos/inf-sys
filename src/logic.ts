import { TemperatureChange, type ExtendedClimateChangeData, type ClimateChangeData, type TemperatureChangeData, ClimateChange, ExtendedClimateChange } from './model';
import { isDateString, isTimeString, isHumidityString, parseDateString, parseTimeString } from './utils';

type ModelData = TemperatureChangeData | ClimateChangeData | ExtendedClimateChangeData;

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

    if (property.includes('"')) {
      const actualValue = property.replaceAll('"', '');
      if (isHumidityString(actualValue)) {
        (data as ClimateChangeData).humidity = property.replaceAll('"', '');
      } else {
        data.location = property.replaceAll('"', '');
      }
      continue;
    }

    data.value = parseFloat(property);
  }

  return data;
}

export function parseInputString(input: string): TemperatureChange {
  const rawProperties = input.split(' ').map(m => m.trim());

  let splitLocationStartIndex: number | null = null;
  for (let i = 0; i < rawProperties.length; i++) {
    const property = rawProperties[i];
    if (property.includes('"') && property.at(-1) !== '"') {
      splitLocationStartIndex = i;
      break;
    }
  }
  if (splitLocationStartIndex !== null) {
    const splitLocationEnd = rawProperties.splice(splitLocationStartIndex + 1, 1);
    rawProperties[splitLocationStartIndex] = `${rawProperties[splitLocationStartIndex]} ${splitLocationEnd}`;
  }

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
