import { Component } from "@angular/core";
import { Weather } from "src/app/models/weather";
import { WeatherDetailsBaseComponent } from "../weather-details-base.component";

@Component({
  selector: 'city-information',
  templateUrl: './city-information.component.html'
})
export class CityInformationComponent implements WeatherDetailsBaseComponent {
  model: Weather;
}