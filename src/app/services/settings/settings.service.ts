import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { WeatherUnit } from "src/app/models/weather";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // Temperature units subject/observable
  private unitsSubject = new BehaviorSubject<WeatherUnit>(WeatherUnit.C);
  currentUnit = this.unitsSubject.asObservable();

  // Settings changed subject/observable
  private settingsChangedSubject = new Subject<void>();
  settingsChanged = this.settingsChangedSubject.asObservable();

  getTemperatureUnit(): WeatherUnit {
    return this.unitsSubject.value;
  }

  setTemperatureUnit(unit: WeatherUnit): void {
    this.unitsSubject.next(unit);
    this.notifySettingsChange();
  }

  notifySettingsChange(): void {
    this.settingsChangedSubject.next();
  }
}