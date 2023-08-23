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
  currentUnit: WeatherUnit;
  citiesCount: number;
  totalCountArray = new Array(10); // array capacity equals total count to display as dropdown options
  
  units = WeatherUnit;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.$currentUnit = this.settingsService.currentUnit.subscribe({
      next: value => this.currentUnit = value
    });

    this.$citiesCount = this.settingsService.citiesCount.subscribe({
      next: value => this.citiesCount = value
    });
  }

  setUnit(unit: WeatherUnit): void {
    this.currentUnit = unit;
    this.settingsService.setTemperatureUnit(unit);
  }

  setCitiesCount(count: number): void {
    this.citiesCount = count;
    this.settingsService.setCitiesCount(count);
  }

  ngOnDestroy(): void {
    this.$currentUnit.unsubscribe();
    this.$citiesCount.unsubscribe();
  }
}