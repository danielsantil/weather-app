import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Weather } from "src/app/models/weather";
import { WeatherService } from "src/app/services/open-weather/weather.service";
import { CityDetailsTab } from "src/app/models/city-details-tab";
import { Subscription } from "rxjs";
import { SettingsService } from "src/app/services/settings/settings.service";
import { DynamicComponentDirective } from "src/app/directives/dynamic-component.directive";
import { WeatherDetailsBaseComponent } from "./weather-details-base.component";
import { WeatherConditionComponent } from "./weather condition/weather-condition.component";
import { TemperatureComponent } from "./temperature/temperature.component";
import { CityInformationComponent } from "./city-information/city-information.component";

@Component({
  selector: 'city-details',
  templateUrl: './city-details.component.html'
})
export class CityDetailsComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicComponentDirective, { static: false }) dynamicComponent: DynamicComponentDirective;
  model: Weather;
  tabs: CityDetailsTab[] = [
    { name: 'Weather Condition', component: WeatherConditionComponent },
    { name: 'Temperature', component: TemperatureComponent },
    { name: 'City Information', component: CityInformationComponent },
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
      next: (response) => {
        this.model = response;
        this.showTab(this.activeTab);
      }
    })
  }

  showTab(tab: CityDetailsTab): void {
    this.activeTab = tab;

    const viewContainer = this.dynamicComponent.viewContainer;
    viewContainer.clear();

    const componentRef = viewContainer.createComponent<WeatherDetailsBaseComponent>(tab.component);
    componentRef.instance.model = this.model;
  }

  goToDashboard(): void {
    this.router.navigate(['/cities']);
  }

  ngOnDestroy(): void {
    this.$settingsChanged.unsubscribe();
  }

}