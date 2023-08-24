import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { WeatherUnit } from "src/app/models/weather";
import { SettingsService } from "src/app/services/settings/settings.service";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {
  $currentUnit: Subscription;
  $citiesCount: Subscription;
  $forecastCount: Subscription;
  currentUnit: WeatherUnit;
  totalCountArray = new Array(10); // array capacity equals total count to display as cities options
  citiesCount: number;
  forecastCountArray = [5, 10, 20, 30, 40];
  forecastCount: number;
  
  units = WeatherUnit;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.$currentUnit = this.settingsService.currentUnit.subscribe({
      next: value => this.currentUnit = value
    });

    this.$citiesCount = this.settingsService.citiesCount.subscribe({
      next: value => this.citiesCount = value
    });

    this.$forecastCount = this.settingsService.forecastCount.subscribe({
      next: value => this.forecastCount = value
    });
  }

  setUnit(unit: WeatherUnit): void {
    this.settingsService.setTemperatureUnit(unit);
  }

  setCitiesCount(count: number): void {
    this.settingsService.setCitiesCount(count);
  }

  setForecastCount(count: number): void {
    this.settingsService.setForecastCount(count);
  }

  ngOnDestroy(): void {
    this.$currentUnit.unsubscribe();
    this.$citiesCount.unsubscribe();
    this.$forecastCount.unsubscribe();
  }
}