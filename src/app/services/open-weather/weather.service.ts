import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Weather } from "src/app/models/weather";
import { environment } from "src/environments/environment";
import { SettingsService } from "../settings/settings.service";
import { ForecastResponse } from "src/app/models/forecast";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = environment.openWeatherApiUrl;

  constructor(private http: HttpClient, private settingsService: SettingsService) { }

  getWeatherByCity(cityId: number): Observable<Weather> {
    let url = `${this.apiUrl}/weather?id=${cityId}`;
    url += '&units=' + this.settingsService.getTemperatureUnit().value;

    return this.http.get<Weather>(url).pipe(
      map(response => {
        this.setIcon(response);
        return response;
      }));
  }

  getForecast(cityId: number, count: number): Observable<ForecastResponse> {
    let url = `${this.apiUrl}/forecast?id=${cityId}`;
    url += '&units=' + this.settingsService.getTemperatureUnit().value;
    url += '&cnt=' + count;

    return this.http.get<ForecastResponse>(url);
  }

  setIcon(response: Weather): void {
    response.iconUrl = `${environment.iconsUrl}/${response.weather[0].icon}.png`;
  }
}