import { Injectable } from "@angular/core";
import { City } from "src/app/models/city";
import Cities from './cities.json';

@Injectable({
  providedIn: 'root'
})
export class MockServerService {

  getCities(count: number): Promise<City[]> {
    const cities: City[] = Array.from(Cities).slice(0, count);
    return new Promise(resolve => resolve(cities));
  } 
}