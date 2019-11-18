import { Component, OnInit,Inject } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';
import { CommonService } from '../_services/common.service';
import { ApplicationSettings } from '../app.config'
import { SidePanelService } from './sidepanel.service';
import { OrgConfig } from './sidepanel-org-config.model';
import { ApplicationConstants } from '../app.constants'
import { DataService } from "../_services/data.service";

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.css']
})
export class SidePanelComponent implements OnInit {
 
  showSidePanel: boolean = false;
  orgConfig: any = {}
  currentOrg: OrgConfig = null;
  userName: String = "";
  constants = ApplicationConstants;
  isSelected;
  role: String ="";
  
  constructor( private serviceInstance: SidePanelService, private router: Router,private data: DataService) {
    this.data.currentPanelId.subscribe(panelId => this.isSelected = panelId);
   
    this.serviceInstance.loadConfig().forEach((item: OrgConfig) => {

      this.orgConfig[item.panelId] = item;
      console.log(item)
      console.log("Neww Config Done!!");
      this.subscribeToChangeEvent();
    
        
    });
    
    if (sessionStorage.getItem("panel-config") == null) {      
      console.log("Wait for panel initialization to complete");
    } else {
      let temp = sessionStorage.getItem("panel-config");
      let panelId:string = JSON.parse(temp).panelId;
      let orgId:string = JSON.parse(temp).orgId;
      let stateURL = JSON.parse(temp).stateURL;
      console.log("OrgID"+orgId)
      console.log("==============")
      if (panelId == null){
        console.log('Waiting from initialization')
      }else{
        this.showSidePanel = true;
        this.currentOrg = this.orgConfig[orgId]; 
        this.isSelected = panelId;

        console.log(this.orgConfig);
        console.log("I am within else")
        console.log(this.currentOrg);
      }
    }
    
  }
  
  ngOnInit() {    
    this.role = sessionStorage.getItem("loginAs")
  }

  subscribeToChangeEvent() {
    this.serviceInstance.showSidePanelEmitter.subscribe((panelData) => {
      if (panelData != null) {
        console.log("Change in Side Panel detected");
        this.showSidePanel = panelData.showSidePanel;
        if (this.showSidePanel == true) {
          if (panelData.panelId) {
           
            console.log("<<<<<<<<<< ORG CONFIG >>>>>>>>>>")
            console.log(this.orgConfig[panelData.orgId])
            this.currentOrg = this.orgConfig[panelData.orgId];
            this.isSelected = panelData.panelId;
            sessionStorage.setItem("panel-config", JSON.stringify(panelData));
          }
        } else {
          this.currentOrg = null;
          sessionStorage.removeItem("panel-config");
        }	
      }
      
    });
  }
    
  changeNavigation(desc,link){  	
  	this.router.navigate([link]);
  }
    
  selectPanel(menu){
    this.isSelected = menu.id;
    this.router.navigate(['/'+menu.link]);
    this.serviceInstance.showSidePanel(true,this.currentOrg.panelId,menu.id,"");
  }
  navToDahsboard(currentOrg){
    this.router.navigate(["/"+currentOrg+"/dashboard/"]);
    this.data.changePanel(ApplicationConstants.DASHBOARD_PANEL_ID);
    this.serviceInstance.showSidePanel(true,currentOrg,ApplicationConstants.DASHBOARD_PANEL_ID,"");
  }
}
