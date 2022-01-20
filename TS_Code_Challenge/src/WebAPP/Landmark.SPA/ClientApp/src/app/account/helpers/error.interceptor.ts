import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {

            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    return throwError(error.statusText);
                }
                if (error.status === 404) {
                    return throwError(error.statusText);
                }
                if (error.status === 0) {
                    return throwError('Service connection not found. Check API service is running?');
                }
                const applicationError = error.headers.get('Application-Error');
                if (applicationError) {
                    return throwError(applicationError);
                }
                const serverError = error.error;
                let modalStateErrors = '';
                if (serverError.errors && typeof serverError.errors === 'object') {
                    for (const key in serverError.errors) {
                        if (serverError.errors[key]) {
                            modalStateErrors += serverError.errors[key] + '\n';
                        }
                    }
                }
                return throwError(modalStateErrors || serverError || 'Server Error');
            }

            // if (err.status === 401) {
            //    // auto logout if 401 response returned from api
            //    this.authenticationService.logout();
            //    location.reload();
            // }

            // const error = err.error.message || err.statusText;
            // return throwError(error);

        }));
    }
}
