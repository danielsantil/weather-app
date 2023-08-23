import { Pipe, PipeTransform } from "@angular/core";
import { SettingsService } from "../services/settings/settings.service";

@Pipe({ name: 'temperature' })
export class TemperaturePipe implements PipeTransform {
  
  constructor(private settings: SettingsService) { }

  transform(value: number, ...args: any[]) {
    return value + ' ' + this.settings.getTemperatureUnit().label;
  }
}