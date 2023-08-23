import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Weather } from "src/app/models/weather";
import { WeatherService } from "src/app/services/open-weather/weather.service";
import { CityDetailsTab } from "src/app/models/city-details-tab";
import { Subscription } from "rxjs";
import { SettingsService } from "src/app/services/settings/settings.service";

@Component({
  selector: 'city-details',
  templateUrl: './city-details.component.html'
})
export class CityDetailsComponent implements OnInit, OnDestroy {
  model: Weather;
  tabs: CityDetailsTab[] = [
    { id: 1, name: 'Weather Condition' },
    { id: 2, name: 'Temperature' },
    { id: 3, name: 'City Information' },
  ];
  cityId: number;
  activeTab: CityDetailsTab;
  $settingsChanged: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService,
    private settingsService: SettingsService,
    ) { }

  ngOnInit(): void {
    this.cityId = +this.route.snapshot.paramMap.get('id')!;
    this.getData();
    this.activeTab = this.tabs[0];

    this.$settingsChanged = this.settingsService.settingsChanged.subscribe({
      next: _ => this.getData()
    });
  }

  getData(): void {
    this.weatherService.getById(this.cityId).subscribe({
      next: (response) => this.model = response
    })
  }

  showTab(tab: CityDetailsTab): void {
    this.activeTab = tab;
  }

  goToDashboard(): void {
    this.router.navigate(['/cities']);
  }

  ngOnDestroy(): void {
    this.$settingsChanged.unsubscribe();
  }

}