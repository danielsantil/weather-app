import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { OpenWeatherInterceptor } from "./open-weather-interceptor";
import { Provider } from "@angular/core";

export const httpInterceptorProviders: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: OpenWeatherInterceptor, multi: true }
];