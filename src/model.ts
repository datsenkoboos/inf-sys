export interface TemperatureChangeData {
  date?: Date;
  location?: string;
  value?: number;
}

export class TemperatureChange {
  date?: Date;
  location?: string;
  value?: number;

  constructor({ date, location, value }: TemperatureChangeData) {
    this.date = date;
    this.location = location;
    this.value = value;
  }
}

export interface ClimateChangeData extends TemperatureChangeData {
  humidity?: number;
}
export class ClimateChange extends TemperatureChange {
  humidity?: number;

  constructor(data: ClimateChangeData) {
    super(data);
    this.humidity = data.humidity;
  }
}

export interface ExtendedClimateChangeData extends ClimateChangeData {
  // "+-VALUE"
  accuracy?: string;
}
export class ExtendedClimateChange extends ClimateChange {
  accuracy?: string;

  constructor(data: ExtendedClimateChangeData) {
    super(data);
    this.accuracy = data.accuracy;
  }
}
