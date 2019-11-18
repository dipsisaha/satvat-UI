import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import { _throw } from 'rxjs/observable/throw';

import { ApplicationConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constants = ApplicationConstants;
  constructor(private http: HttpClient) { }

  getAdminDetails(reqJson) :Observable<any> {

    let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.GET_ADMIN_DETAILS;

    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");  

    return this.http.post<any>(_url,reqJson,{headers:headers})
    .pipe(
      retry(2), 
      catchError(this.handleError) 
     ).finally(() => {
       //this.spinner.emit(false);	
       });
   }

  updateAdminDetails(reqJson): Observable<any> {
    let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.UPDATE_ADMIN_DETAILS;

    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");       
  
    return this.http.post(_url,reqJson,{headers:headers})
      .pipe(
    retry(2), 
    catchError(this.handleError) 
   ).finally(() => {
     //this.spinner.emit(false);	
     });
 } 
 
   handleError(error: HttpErrorResponse) {
     return throwError(error.message || "Server Error")
   }
}
