import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { WeatherUnit } from "src/app/models/weather";
import { SettingsService } from "src/app/services/settings/settings.service";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {
  units = WeatherUnit;
  currentUnit: WeatherUnit;
  $currentUnit: Subscription;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.$currentUnit = this.settingsService.currentUnit.subscribe({
      next: value => this.currentUnit = value
    });
  }

  setUnit(unit: WeatherUnit): void {
    this.currentUnit = unit;
    this.settingsService.setTemperatureUnit(unit);
  }

  ngOnDestroy(): void {
    this.$currentUnit.unsubscribe();
  }
}