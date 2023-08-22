import { Component, OnInit } from "@angular/core";
import { Weather } from "src/app/models/weather";
import { MockServerService } from "src/app/services/mock-server/mock-server.service";
import { WeatherService } from "src/app/services/open-weather/weather.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'cities-dashboard',
  templateUrl: './cities.component.html'
})
export class CitiesComponent implements OnInit {
  data: Weather[];

  constructor(
    private mockServer: MockServerService,
    private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    // first, we map all cities to an initial array of weather entries.
    this.data = (await this.mockServer.getCities(5)).map(entry => { 
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
}