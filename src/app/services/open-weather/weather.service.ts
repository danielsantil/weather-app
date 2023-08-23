import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Weather } from "src/app/models/weather";
import { environment } from "src/environments/environment";
import { SettingsService } from "../settings/settings.service";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = environment.openWeatherApiUrl;

  constructor(private http: HttpClient, private settingsService: SettingsService) { }

  getById(cityId: number): Observable<Weather> {
    let url = `${this.apiUrl}/weather?id=${cityId}`;
    url += '&units=' + this.settingsService.getTemperatureUnit().value;

    return this.http.get<Weather>(url).pipe(
      map(response => {
        this.setIcon(response);
        return response;
      }));
  }

  setIcon(response: Weather): void {
    response.iconUrl = `${environment.iconsUrl}/${response.weather[0].icon}.png`;
  }
}