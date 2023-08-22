import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { AppRoutingModule } from './app-routing.module';
import { CityInformationComponent } from './components/city-details/city-information/city-information.component';
import { TemperatureComponent } from './components/city-details/temperature/temperature.component';
import { WeatherConditionComponent } from './components/city-details/weather condition/weather-condition.component';

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    CityDetailsComponent,
    CityInformationComponent,
    TemperatureComponent,
    WeatherConditionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
