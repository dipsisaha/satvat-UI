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
export class VendorService {

  constants = ApplicationConstants;
  constructor(private http: HttpClient) { }

  getVendorList() :Observable<any> {

    let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.GET_VENDOR_LIST;
    //this.spinner.emit(true);
    console.log("VENDOR LIST >>>>"+_url)
     return this.http.get<any>(_url)
     .pipe(
      retry(3), 
      catchError(this.handleError) 
    ).finally(() => {
     //this.spinner.emit(false);	
     });
    }

  getVendorById(reqJson) :Observable<any> {

    let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.GET_VENDOR_DETAILS_BY_ID;

    console.log(_url)

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

  addVendor(reqJson) :Observable<any> {

      let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.ADD_VENDOR;
  
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

    deleteVendor(reqJson) :Observable<any> {

      let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.DELETE_VENDOR;
  
      let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "application/json");  
  
      return this.http.delete<any>(_url,reqJson)
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
