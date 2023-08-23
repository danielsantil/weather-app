import { Type } from "@angular/core";
import { WeatherDetailsBaseComponent } from "../components/city-details/weather-details-base.component";

export class CityDetailsTab {
  name: string;
  component: Type<WeatherDetailsBaseComponent>;
}