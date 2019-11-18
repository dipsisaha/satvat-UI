import { Component } from '@angular/core';
import { Router,NavigationEnd,ActivatedRoute  } from '@angular/router';
import { DataService } from "./_services/data.service";
import { ApplicationConstants } from './app.constants';
import { SidePanelService } from './sidepanel/sidepanel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
   
  orgName = 'VAT';
  
  constants = ApplicationConstants;
  isshowSidebar: boolean = false;

  constructor(private router: Router,private data: DataService,private _sidepanel:SidePanelService,private route: ActivatedRoute) { 
  }
  
  ngOnInit() {

        //.data.currentOrgId.subscribe(orgId => this.orgName = orgId);
        this._sidepanel.showSidePanelEmitter.subscribe((navData) => {
          if (navData != null) {
            console.log("Change in navbar detected");
            this.isshowSidebar = navData.showSidePanel;
            console.log(this.isshowSidebar)
            
          } 
          
        });
        
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });       
        
        let user = sessionStorage.getItem("user_details");
        if(user){
            this.orgName = JSON.parse(user).orgName;
            this.isshowSidebar =true
        }
        
  }
}
