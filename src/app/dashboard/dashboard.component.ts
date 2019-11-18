import { Component, OnInit } from '@angular/core';
import {ExcelService} from '../_services/excel.service';
import {IMyDrpOptions} from 'mydaterangepicker';
import { Router,ActivatedRoute } from '@angular/router';
import { DataService } from "../_services/data.service";
import { DashboardService } from '../_services/dashboard.service';
import { SidePanelService } from '../sidepanel/sidepanel.service'
import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public admin_id; 
  model = {};
  contsant = ApplicationConstants

  public errorMsg;
  constructor(public router: Router,private activatedRoute: ActivatedRoute,private data: DataService,private dashboardService: DashboardService) {
  }

  ngOnInit() {

    let requestJson = {};

    this.admin_id = sessionStorage.getItem('admin_id')

    requestJson['id'] =   this.admin_id  

    this.dashboardService.getAdminDetails(requestJson)
                         .subscribe(data =>{
                                        this.model   = data.value
                                      
                                    },
                                    error =>this.errorMsg  = error );
     
  }

  submit() {
    let requestJson = {};

    requestJson['password'] = this.model['password'];
    requestJson['email'] = this.model['email'];
    requestJson['userName'] = this.model['userName'];
    requestJson['fb'] = this.model['fb'];
    requestJson['insta'] = this.model['insta'];
    requestJson['id'] = sessionStorage.getItem('admin_id');

    this.dashboardService.updateAdminDetails(requestJson)
    .subscribe(res =>{
               console.log(res)
               if(res.success) {
                 //alert(res.msg)
                 alert("Admin details updated sucessfully")
                 this.router.navigate(["/"+this.contsant.ORG_USER+"/dashboard"]);
               }
               },
               error =>this.errorMsg  = error ); 

  }
  
 
}
