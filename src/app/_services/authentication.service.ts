import { Injectable,Output , EventEmitter,Inject } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse,HttpParams } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/finally';
import { ApplicationSettings } from '../app.config'
import { ApplicationConstants } from '../app.constants';

@Injectable()
export class AuthenticationService {
	@Output() public spinner:EventEmitter<boolean>=null;
	
	   	
    constructor(private httpClient: HttpClient) {
        this.spinner = new EventEmitter<boolean>();
    }
    
    constants = ApplicationConstants;
    authenticateUser(user,isSilentLogin): Observable<any> {
       if(!isSilentLogin){
	   	this.spinner.emit(true);
	   }
	   let headers = new HttpHeaders();
	   headers = headers.set("Content-Type", "application/json");
       let org = user.org;
       let ORG_API=""; 
       let url=""
       let jsonReq={}
       if(org == this.constants.ORG_USER) {
             ORG_API = this.constants.API_PREFIX;
       } 
    //    else if(org == this.constants.ORG_BOSCH){
    //          ORG_API = this.constants.API_PREFIX_BOSCH;
    //    }
       //return this.httpClient.post(ApplicationSettings.API_ENDPOINT+'/login',user,{headers:headers})
       

       url = "/"+this.constants.API_PREFIX+"/"+this.constants.API_LOGIN;
       jsonReq = {
           "userName" : user.username,
           "password" : user.password
       }
  
	   return this.httpClient.post(url,jsonReq,{headers:headers})
    	    .map(res => {
		    		  return res;
	        }, error => {
	        	this.handleError;
                console.log(error);
	            return error;
	        }).finally(() => {
	        	if(!isSilentLogin){
	           		this.spinner.emit(false);
	           	}	    	
	        });
	}   
	
	
    /** 
    * Handle error messages raising out of http error
    * 
    */
    private handleError(error: HttpErrorResponse | any) {
        let errMsg: string;
        console.log("Error message received" + JSON.stringify(error));
        if (error instanceof HttpErrorResponse) {
            const err = error.error || JSON.stringify(error);
            errMsg = `Error in communicating to server`;
        } else {
            errMsg = error.error ? error.error : "Server returned exception";
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
