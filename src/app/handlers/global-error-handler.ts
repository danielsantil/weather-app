import { ErrorHandler, Injectable } from "@angular/core";
import { ConsoleLogger } from "./loggers/console-logger.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private logger: ConsoleLogger) { }

  handleError(error: Error | HttpErrorResponse): void {

    let message: string;

    if (error instanceof HttpErrorResponse) {
      message = error.message;
    } else {
      message = error.message ?? error.toString();
    }

    this.logger.log(message, error);
  }

}