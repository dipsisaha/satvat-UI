import { Injectable,Output , EventEmitter, } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationConstants } from '../app.constants';
import { NavbarService } from '../navbar/navbar.service';
import { SidePanelService } from '../sidepanel/sidepanel.service';
import { DataService } from "../_services/data.service";

@Injectable()
export class CommonService {
@Output() public spinner:EventEmitter<boolean>=null;
	
	   	
    constructor(private navbarService: NavbarService,private sidepanelService: SidePanelService,public router: Router,private data: DataService) {
        this.spinner = new EventEmitter<boolean>();
    }  
    
    logout(){    	
    	//check the user role and redirect accordingly                	
    	if(sessionStorage.getItem("user_details")){
    		let user = JSON.parse(sessionStorage.getItem("user_details"));
    		console.log(user);
    		if(user.orgName == ApplicationConstants.ORG_USER){
    			this.router.navigate( ['/login/'+ApplicationConstants.ORG_USER] );
    		}
    	}else{
        	this.router.navigate( ['/login/'+ApplicationConstants.ORG_USER] );
        }
				sessionStorage.removeItem("menu-config");
	  	localStorage.clear();
	    sessionStorage.clear();    
    }
    
    
    initializeLoggedInUser(userJson,token,isSilentLogin){
	  	//userdetails
			sessionStorage.setItem("user_details",JSON.stringify(userJson));
		  //token   
		  sessionStorage.setItem("token", JSON.stringify(token)); 
		  //API 
		  if(userJson.orgName == ApplicationConstants.ORG_USER)  {
		    sessionStorage.setItem("org_api", ApplicationConstants.API_PREFIX);
			} 
			// else if(userJson.orgName == ApplicationConstants.ORG_BOSCH) {
		  //   sessionStorage.setItem("org_api",ApplicationConstants.API_PREFIX_BOSCH);
		  // }  
		   
		  if(!isSilentLogin){
		      //navbar
		  	  let stateURL = '/'+userJson.orgName+'/dashboard';
		      this.navbarService.showNavBarWithTitle(true,userJson.orgName,ApplicationConstants.ROLE_ASSOCIATE,userJson.username,stateURL);
		      //sidepanel
		      this.sidepanelService.showSidePanel(true,userJson.orgName,'1',stateURL);
		      this.data.changeOrg(userJson.orgName);
		      //dashboard
		      this.router.navigate(['/'+userJson.orgName,'dashboard']);	
		 }        
    }
  
}
