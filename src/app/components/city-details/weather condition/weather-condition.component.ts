import { Component } from "@angular/core";
import { Weather } from "src/app/models/weather";
import { WeatherDetailsBaseComponent } from "../weather-details-base.component";

@Component({
  selector: 'weather-condition',
  templateUrl: './weather-condition.component.html'
})
export class WeatherConditionComponent implements WeatherDetailsBaseComponent {
  model: Weather;
}