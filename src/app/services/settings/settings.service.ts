import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { WeatherUnit } from "src/app/models/weather";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // Settings changed subject/observable
  private settingsChangedSubject = new Subject<void>();
  settingsChanged = this.settingsChangedSubject.asObservable();

  // Temperature units subject/observable
  private unitsSubject = new BehaviorSubject<WeatherUnit>(WeatherUnit.C);
  currentUnit = this.unitsSubject.asObservable();

  // Cities count subject/observable
  private citiesCountSubject = new BehaviorSubject<number>(6);
  citiesCount = this.citiesCountSubject.asObservable();

  // Forecast count subject/observable
  private forecastCountSubject = new BehaviorSubject<number>(10);
  forecastCount = this.forecastCountSubject.asObservable();

  getTemperatureUnit(): WeatherUnit {
    return this.unitsSubject.value;
  }

  setTemperatureUnit(unit: WeatherUnit): void {
    this.unitsSubject.next(unit);
    this.notifySettingsChange();
  }

  setCitiesCount(count: number): void {
    this.citiesCountSubject.next(count);
    this.notifySettingsChange();
  }

  getForecastCount(): number {
    return this.forecastCountSubject.value;
  }

  setForecastCount(count: number): void {
    this.forecastCountSubject.next(count);
    this.notifySettingsChange();
  }

  notifySettingsChange(): void {
    this.settingsChangedSubject.next();
  }
}