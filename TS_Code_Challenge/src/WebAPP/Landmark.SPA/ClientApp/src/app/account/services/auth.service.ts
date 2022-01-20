import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
// import { SharedService } from '../../shared/ui/shared.service';
import { CookieService } from '../services/cookie.service';
import { User, UserWithToken } from '../models/auth.models';
import { Login } from '../models/auth.models';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Idle } from '@ng-idle/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    user: User;
    userWithToken: UserWithToken;
    myAppUrl: string;
    myApiUrl: string;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
        })
    };
    userLoggedIn = false;
    // tslint:disable-next-line: max-line-length
    constructor(private idle: Idle, private http: HttpClient, private cookieService: CookieService, private route: ActivatedRoute, private router: Router) {

        // this.myAppUrl = baseUrl;
        this.myAppUrl = environment.appUrl;
        this.myApiUrl = 'api/auth/';

        const userLoggedInStatus = JSON.parse(localStorage.getItem('userLoggedIn')) as boolean;
        if ( userLoggedInStatus === null) {
            this.userLoggedIn = false;
        } else {

            this.userLoggedIn = userLoggedInStatus;
        }
    }

    setUserLoggedIn(userLoggedIn: boolean) {
        localStorage.setItem('userLoggedIn', JSON.stringify(userLoggedIn));
        this.userLoggedIn = userLoggedIn;
      }

    getUserLoggedIn() {
        const userLoggedInStatus = JSON.parse(localStorage.getItem('userLoggedIn')) as boolean;
        if ( userLoggedInStatus === null) {
            this.userLoggedIn = false;
        } else {

            this.userLoggedIn = userLoggedInStatus;
        }

        return this.userLoggedIn;
      }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        if (!this.user) {
            this.user = JSON.parse(this.cookieService.getCookie('currentUser'));
        }
        return this.user;
    }

    /**
     * Returns the current user
     */
    public currentUserWithToken(): UserWithToken {
        if (!this.userWithToken) {
            this.userWithToken = JSON.parse(this.cookieService.getCookie('currentUserWithToken'));
        }
        return this.userWithToken;
    }

    /**
     * Performs the customer auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {

        const login: Login = {
            email,
            password,
        };

        return this.http.post<UserWithToken>(this.myAppUrl + this.myApiUrl + 'login/', JSON.stringify(login), this.httpOptions)
            .pipe(map(userWithToken => {
                // login successful if there's a jwt token in the response
                if (userWithToken && userWithToken.token) {

                    this.cookieService.setCookie('currentUserWithToken', JSON.stringify(userWithToken), 1);
                    localStorage.setItem('currentUserWithToken', JSON.stringify(userWithToken));

                    this.user = userWithToken.user;
                    // store user details and jwt in cookie
                    this.cookieService.setCookie('currentUser', JSON.stringify(this.user), 1);
                    localStorage.setItem('currentUser', JSON.stringify(this.user));

                    this.idle.watch();
                }
                return this.user;
            })
                , retry(1),
                catchError(this.errorHandler));
    }
    
    errorHandler(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
           // Get client-side error
           errorMessage = error.error.message;
        } 
        // else if (error != null){
        //    // Get server-side error
        //    errorMessage = error;
        // }
        else{
            errorMessage = error;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteCookie('currentUser');
        this.cookieService.deleteCookie('currentUserWithToken');
        this.setUserLoggedIn(false);
        this.idle.stop();
        localStorage.removeItem('currentUser');
        this.user = null;
        localStorage.removeItem('currentUserWithToken');
        this.router.navigate(['/account/auth/login']);
    }
}

