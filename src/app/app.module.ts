import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AppRoutingModule } from './app-routing.module';
import { CityInformationComponent } from './components/city-details/city-information/city-information.component';
import { TemperatureComponent } from './components/city-details/temperature/temperature.component';
import { WeatherConditionComponent } from './components/city-details/weather condition/weather-condition.component';
import { TimezonePipe } from './pipes/timezone.pipe';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';
import { httpInterceptorProviders } from './interceptors/interceptors';

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    CityDetailsComponent,
    CityInformationComponent,
    TemperatureComponent,
    WeatherConditionComponent,
    SettingsComponent,
    TimezonePipe,
    TemperaturePipe,
    DynamicComponentDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
