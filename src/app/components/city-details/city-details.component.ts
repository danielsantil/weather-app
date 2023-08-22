import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Weather } from "src/app/models/weather";
import { WeatherService } from "src/app/services/open-weather/weather.service";
import { CityDetailsTab } from "src/app/models/city-details-tab";

@Component({
  selector: 'city-details',
  templateUrl: './city-details.component.html'
})
export class CityDetailsComponent implements OnInit {
  model: Weather;
  tabs: CityDetailsTab[] = [
    { id: 1, name: 'Weather Condition' },
    { id: 2, name: 'Temperature' },
    { id: 3, name: 'City Information' },
  ];
  activeTab: CityDetailsTab;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService
    ) { }

  ngOnInit(): void {
    let cityId = +this.route.snapshot.paramMap.get('id')!;
    this.getData(cityId);
    this.activeTab = this.tabs[0];
  }

  getData(cityId: number): void {
    this.weatherService.getById(cityId).subscribe({
      next: (response) => this.model = response
    })
  }

  showTab(tab: CityDetailsTab): void {
    this.activeTab = tab;
  }

  goToDashboard(): void {
    this.router.navigate(['/cities']);
  }

}