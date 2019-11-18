import { Injectable,Output , EventEmitter } from '@angular/core';
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
export class FinishedgoodsService {
  @Output() public spinner:EventEmitter<boolean>=null;
  
  constants = ApplicationConstants;

  constructor(private http: HttpClient) { 
    this.spinner = new EventEmitter<boolean>();
  }

  getGoodsList() :Observable<any> {

    let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.GET_GOODS_LIST;
    this.spinner.emit(true);
    console.log("GOODS LIST >>>>"+_url)
     return this.http.get<any>(_url)
     .pipe(
      retry(3), 
      catchError(this.handleError) 
    ).finally(() => {
     this.spinner.emit(false);	
     });
    }

  getGoodsById(reqJson) :Observable<any> {

    let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.GET_GOODS_DETAILS_BY_ID;

    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");  

    return this.http.post<any>(_url,reqJson,{headers:headers})
    .pipe(
      retry(2), 
      catchError(this.handleError) 
      ).finally(() => {
        this.spinner.emit(false);	
        });
    }

  addGoods(reqJson) :Observable<any> {

      let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.ADD_GOODS;
  
      let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "application/json");  
  
      return this.http.post<any>(_url,reqJson,{headers:headers})
      .pipe(
        retry(2), 
        catchError(this.handleError) 
        ).finally(() => {
          this.spinner.emit(false);	
          });
    }

    deleteGoods(reqJson) :Observable<any> {

      let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.DELETE_GOODS;
  
      let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "application/json");
      console.log(_url)  
  
      return this.http.delete<any>(_url,reqJson)
      .pipe(
        retry(2), 
        catchError(this.handleError) 
        ).finally(() => {
          this.spinner.emit(false);	
          });
    }  

    getGoodsListByVendor(reqJson) :Observable<any> {

      let _url = "/"+this.constants.API_PREFIX+"/"+this.constants.GET_GOODS_BY_VENDOR;
      
      let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "application/json");  
      console.log("PRODUCT LIST BY GOODS>>>>"+_url)
      return this.http.post<any>(_url,reqJson,{headers:headers})
      .pipe(
        retry(2), 
        catchError(this.handleError) 
        ).finally(() => {
          this.spinner.emit(false);	
          });
      }

    
    handleError(error: HttpErrorResponse) {
      return throwError(error.message || "Server Error")
    }

}
