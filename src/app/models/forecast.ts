import { MainInfo, WeatherCondition, Wind } from "./weather";

export class ForecastResponse {
  /** Count of timestamps */
  cnt: number;
  /** List of forecasts */
  list: Forecast[];
}

export class Forecast {
  dt: number;
  main: MainInfo;
  weather: WeatherCondition[];
  wind: Wind;
  visibility: number;
  pop: number;
}