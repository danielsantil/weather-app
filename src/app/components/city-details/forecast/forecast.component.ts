import { Component, OnInit } from "@angular/core";
import { WeatherDetailsBaseComponent } from "../weather-details-base.component";
import { WeatherService } from "src/app/services/open-weather/weather.service";
import { Weather, WeatherUnit } from "src/app/models/weather";
import { ForecastResponse } from "src/app/models/forecast";
import { Chart, ScriptableLineSegmentContext, TooltipItem } from "chart.js/auto";
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
  blue = 'rgb(54, 162, 235)';
  red = 'rgb(255, 0, 0)';
  yellow = 'rgb(255, 150, 0)';
  gray = 'rgb(110, 110, 110)';

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
    this.weatherService.getForecast(this.model.id, this.forecastCount).subscribe({
      next: response => {
        this.forecast = response;
        const data = this.forecast.list.map(x => {
          const date = new Date(x.dt * 1000);
          const label = this.datePipe.transform(date, 'MMM-dd ha');
          return { x: label, y: x.main.temp };
        });
        this.createChart(data);
      }
    });
  }
  
  createChart(data: any[]): void {
    if (this.chart)
      this.chart.destroy();

    this.chart = new Chart('forecast-chart', {
      type: 'line',
      data: {
        datasets: [{
          label: 'Forecast',
          data: data,
          tension: 0.1,
          pointRadius: 5,
          borderColor: this.gray,
          segment: {
            borderColor: (ctx) => this.createGradientLine(ctx)
          }
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              title: () => 'Forecast Info',
              label: (ctx) => this.onTooltipLabelHover(ctx)
            }
          },
          legend: {
            display: false
          }
        }
      }
    });
  }

  onTooltipLabelHover(ctx: TooltipItem<any>): string | string[] {
    const model = this.forecast.list[ctx.dataIndex];
    return [
      `Date: ${new Date(model.dt * 1000).toDateString()}`,
      `Time: ${new Date(model.dt * 1000).toLocaleTimeString()}`,
      `Temp: ${model.main.temp} ${this.tempUnit.label}`
    ];
  }

  createGradientLine(ctx: ScriptableLineSegmentContext): CanvasGradient {
    const temp1 = ctx.p0.parsed.y;
    const temp2 = ctx.p1.parsed.y;

    const gradient = this.chart.canvas.getContext('2d')!
        .createLinearGradient(ctx.p0.x, ctx.p0.y, ctx.p1.x, ctx.p1.y);
    gradient.addColorStop(0, this.getTempColor(temp1));
    gradient.addColorStop(1, this.getTempColor(temp2));

    return gradient;
  }

  getTempColor(temp: number): string {
    if (this.isCool(temp))
      return this.blue;
    if (this.isHot(temp))
      return this.red;
    return this.yellow;
  }

  isCool(temp: number): boolean {
    return this.tempUnit == WeatherUnit.C && temp < 18
      || this.tempUnit == WeatherUnit.F && temp < 64.4
      || this.tempUnit == WeatherUnit.K && temp < 291.15;
  }

  isHot(temp: number): boolean {
    return this.tempUnit == WeatherUnit.C && temp > 30
      || this.tempUnit == WeatherUnit.F && temp > 86
      || this.tempUnit == WeatherUnit.K && temp > 303.15;
  }
}