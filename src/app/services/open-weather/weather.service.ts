import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";
import { Weather } from "src/app/models/weather";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = environment.openWeatherApiUrl;
  private apiKey = environment.openWeatherApiKey;

  constructor(private http: HttpClient) { }

  getById(cityId: number): Observable<Weather> {
    let url = this.url(`${this.apiUrl}/weather?id=${cityId}&units=metric`);
    return this.http.get<Weather>(url).pipe(
      map(response => {
        this.setIcon(response);
        return response;
      }));
  }

  url(url: string): string {
    return url + '&appid=' + this.apiKey;
  }

  setIcon(response: Weather): void {
    response.iconUrl = `${environment.iconsUrl}/${response.weather[0].icon}.png`;
  }
}