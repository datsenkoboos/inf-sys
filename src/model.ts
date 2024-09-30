export interface TemperatureChangeData {
  date?: Date;
  location?: string;
  value?: number;
}

export default class TemperatureChange {
  date?: Date;
  location?: string;
  value?: number;

  constructor({ date, location, value }: TemperatureChangeData) {
    this.date = date;
    this.location = location;
    this.value = value;
  }
}
