import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
//import {AuthService} from "../auth/auth.services";
//import { AuthService } from '../../../../src/app/core/auth/auth.service';
//import { AuthUtils } from "../auth/auth.utils";
//import { environment } from "../../../environments/environment";
import {Router} from '@angular/router';
import {environment} from "../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(

    private router: Router) {
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req.clone();
    newReq = req.clone({
      headers: req.headers
        .set("SO", "web")
        .set("project", "front-examen")
        .set("Accept", 'application/json')
    });

    // Response
    return next.handle(newReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !location.pathname.includes("login")
        ) {
          localStorage.clear();
        }
        return throwError(error);
      })
    );
  }
}
