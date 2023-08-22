import { Component, Input } from "@angular/core";
import { Weather } from "src/app/models/weather";

@Component({
  selector: 'weather-condition',
  templateUrl: './weather-condition.component.html'
})
export class WeatherConditionComponent {
  @Input() model: Weather;
}