import { Component, OnDestroy, OnInit } from "@angular/core";
import { WeatherDetailsBaseComponent } from "../weather-details-base.component";
import { WeatherService } from "src/app/services/open-weather/weather.service";
import { Weather, WeatherUnit } from "src/app/models/weather";
import { ForecastResponse } from "src/app/models/forecast";
import { Chart } from "chart.js/auto";
import { SettingsService } from "src/app/services/settings/settings.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'forecast',
  templateUrl: './forecast.component.html'
})
export class ForecastComponent implements WeatherDetailsBaseComponent, OnInit {
  model: Weather;
  forecast: ForecastResponse;
  chart: Chart;
  tempUnit: WeatherUnit;
  forecastCount: number;

  constructor(
    private weatherService: WeatherService,
    private settingsService: SettingsService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.forecastCount = this.settingsService.getForecastCount();
    this.tempUnit = this.settingsService.getTemperatureUnit();
    this.getData();
  }

  getData(): void {
    if (this.chart)
      this.chart.destroy();

    this.weatherService.getForecast(this.model.id, this.forecastCount).subscribe({
      next: response => {
        this.forecast = response;
        const data = this.forecast.list.map(x => {
          let date = new Date(x.dt * 1000);
          let label = this.datePipe.transform(date, 'yyyy-MM-dd ha');
          let val = x.main.temp;
          return { x: label, y: val };
        });
        const colors = this.forecast.list.map(x => {
          if (this.isCool(x.main.temp))
            return 'rgb(54, 162, 235)';
          if (this.isHot(x.main.temp))
            return 'rgb(255, 0, 0)';
          else
            return 'rgb(255, 150, 0)';
        });
        this.createChart(data, colors);
      }
    });
  }

  createChart(data: any[], colors: string[]): void {
    this.chart = new Chart('forecast-chart', {
      type: 'line',
      data: {
        datasets: [{
          label: 'Forecast',
          data: data,
          backgroundColor: colors,
          segment: {
            borderColor: (context) => {
              const xVal = context.p0.parsed.y;
              if (this.isCool(xVal))
              return 'rgb(54, 162, 235)';
            if (this.isHot(xVal))
              return 'rgb(255, 0, 0)';
            else
              return 'rgb(255, 150, 0)';
            }
          }
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              title: () => 'Forecast Info',
              label: (context) => this.onTooltipLabelHover(context)
            }
          },
          legend: {
            display: false
          }
        }
      }
    });
  }

  onTooltipLabelHover(context: any): string | string[] {
    const model = this.forecast.list[context.dataIndex];
    return [
      `Date: ${new Date(model.dt * 1000).toDateString()}`,
      `Time: ${new Date(model.dt * 1000).toLocaleTimeString()}`,
      `Temp: ${model.main.temp} ${this.tempUnit.label}`
    ];
  }

  isCool(temp: number): boolean {
    return this.tempUnit == WeatherUnit.C && temp < 18
      || this.tempUnit == WeatherUnit.F && temp < 63
      || this.tempUnit == WeatherUnit.K && temp < 290;
  }

  isHot(temp: number): boolean {
    return this.tempUnit == WeatherUnit.C && temp > 30
      || this.tempUnit == WeatherUnit.F && temp > 86
      || this.tempUnit == WeatherUnit.K && temp > 303;
  }
}