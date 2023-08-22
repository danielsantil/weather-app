import { Component, Input } from "@angular/core";
import { Weather } from "src/app/models/weather";

@Component({
  selector: 'city-information',
  templateUrl: './city-information.component.html'
})
export class CityInformationComponent {
  @Input() model: Weather;
}