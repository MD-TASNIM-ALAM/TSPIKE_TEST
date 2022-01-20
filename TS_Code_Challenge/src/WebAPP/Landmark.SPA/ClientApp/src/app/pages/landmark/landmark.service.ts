import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Landmark } from './Landmark.model';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {

  myAppUrl: string;
  myApiUrl: string;
  serviceLocation: string;
  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8'
      })
  };

  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/landmark/';
  }

  getLandmarkers(): Observable<Landmark[]> {
    return this.http.get<Landmark[]>(this.myAppUrl + this.myApiUrl + 'getLandmarks')
          .pipe(
            retry(1),
            catchError(this.errorHandler)
          );
  }

  postLandmark(remark): Observable<any> {
    return this.http.post<any>(this.myAppUrl + this.myApiUrl + 'postLandmark/' , JSON.stringify(remark), this.httpOptions)
          .pipe(
            retry(1),
            catchError(this.errorHandler)
          );
  }

  errorHandler(error) {
    // let errorMessage = '';
    // if (error.error instanceof ErrorEvent) {
    //    // Get client-side error
    //    errorMessage = error.error.message;
    // } else {
    //    // Get server-side error
    //    errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
    // }
    // console.log(errorMessage);
    return throwError(error);
  }
  
}
