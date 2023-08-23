import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'timezone' })
export class TimezonePipe implements PipeTransform {
  transform(value: number, ...args: any[]): string {
    const hours = value / 3600;
    return hours < 0 ? 'UTC' + hours : 'UTC+' + hours; 
  }
}