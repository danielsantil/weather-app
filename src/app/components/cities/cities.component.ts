import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Weather, WeatherUnit } from "src/app/models/weather";
import { MockServerService } from "src/app/services/mock-server/mock-server.service";
import { WeatherService } from "src/app/services/open-weather/weather.service";
import { SettingsService } from "src/app/services/settings/settings.service";

@Component({
  selector: 'cities-dashboard',
  templateUrl: './cities.component.html'
})
export class CitiesComponent implements OnInit, OnDestroy {
  data: Weather[];
  currentUnit: WeatherUnit;
  $currentUnit: Subscription;
  $settingsChanged: Subscription;

  constructor(
    private mockServer: MockServerService,
    private weatherService: WeatherService,
    private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.getData();
    this.$currentUnit = this.settingsService.currentUnit.subscribe({
      next: value => this.currentUnit = value
    });

    this.$settingsChanged = this.settingsService.settingsChanged.subscribe({
      next: _ => this.refresh()
    });
  }

  async getData() {
    // first, we map all cities to an initial array of weather entries.
    this.data = (await this.mockServer.getCities(6)).map(entry => { 
      return new Weather(entry.id)
    });

    // go through each added city and request weather data to api. this ensures array order is kept.
    this.data.forEach((city, index) => {
      this.weatherService.getById(city.id).subscribe({
        next: (response: Weather) => this.data.splice(index, 1, response),
        error: console.log
      });
    });
  }

  refresh(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.$currentUnit.unsubscribe();
    this.$settingsChanged.unsubscribe();
  }
}