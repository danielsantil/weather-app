import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class OpenWeatherInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // intercept only requests to OpenWeather API
    if (!req.url.includes(environment.openWeatherApiUrl))
      return next.handle(req);

    const apiKeyPath = '&appid=' + environment.openWeatherApiKey;
    
    const newReq = req.clone({
      url: req.url + apiKeyPath
    });

    return next.handle(newReq);
  }
}