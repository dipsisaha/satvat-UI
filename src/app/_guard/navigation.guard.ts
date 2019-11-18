import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApplicationConstants } from '../app.constants'

@Injectable()
export class NavigationGuard implements CanActivate {

    constructor(private r: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): any {
        console.log("Route Requested" + JSON.stringify(state.url));
        if (sessionStorage.getItem("user_details") &&  (state['url'].indexOf(JSON.parse(sessionStorage.getItem("user_details"))['orgName']) != -1)) {
            return true;
        }else{
        	alert("Unauthorized Access");
        	if(state.url.indexOf(ApplicationConstants.ORG_USER) != -1){
        		this.r.navigateByUrl("login/VAT");
        	}else{
        		this.r.navigateByUrl("login/VAT");
        	}        	
        }
    }
}