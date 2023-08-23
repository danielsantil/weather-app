import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ConsoleLogger {
  
  log(message: string, error?: any): void {
    console.log('WeatherAppLogger: %s, ', message, error);
  }

}