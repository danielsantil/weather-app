import { Component, Input } from "@angular/core";
import { Weather } from "src/app/models/weather";

@Component({
  selector: 'temperature',
  templateUrl: './temperature.component.html'
})
export class TemperatureComponent {
  @Input() model: Weather;
}