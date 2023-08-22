import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, lastValueFrom } from "rxjs";
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
    return this.http.get<Weather>(url);
  }

  url(url: string): string {
    return url + '&appid=' + this.apiKey;
  }
}