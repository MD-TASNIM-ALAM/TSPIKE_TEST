import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUserWithToken = this.authenticationService.currentUserWithToken();
        if (currentUserWithToken && currentUserWithToken.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUserWithToken.token}`
                }
            });
        }

        return next.handle(request);
    }
}
