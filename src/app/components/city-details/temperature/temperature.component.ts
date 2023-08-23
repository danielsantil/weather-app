import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Weather, WeatherUnit } from "src/app/models/weather";
import { SettingsService } from "src/app/services/settings/settings.service";

@Component({
  selector: 'temperature',
  templateUrl: './temperature.component.html'
})
export class TemperatureComponent implements OnInit, OnDestroy {
  @Input() model: Weather;
  currentUnit: WeatherUnit;
  $currentUnit: Subscription;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.$currentUnit = this.settingsService.currentUnit.subscribe({
      next: value => this.currentUnit = value
    });
  }

  ngOnDestroy(): void {
    this.$currentUnit.unsubscribe();
  }
}