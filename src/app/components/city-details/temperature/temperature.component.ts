import { Component } from "@angular/core";
import { Weather } from "src/app/models/weather";
import { WeatherDetailsBaseComponent } from "../weather-details-base.component";

@Component({
  selector: 'temperature',
  templateUrl: './temperature.component.html'
})
export class TemperatureComponent implements WeatherDetailsBaseComponent {
  model: Weather;
}