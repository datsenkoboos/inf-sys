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
  // VALUE%
  humidity?: string;
}
export class ClimateChange extends TemperatureChange {
  humidity?: string;

  constructor(data: ClimateChangeData) {
    super(data);
    this.humidity = data.humidity;
  }
}

export interface ExtendedClimateChangeData extends ClimateChangeData {
  time?: number;
}
export class ExtendedClimateChange extends ClimateChange {
  time?: number;

  constructor(data: ExtendedClimateChangeData) {
    super(data);
    this.time = data.time;
  }
}
