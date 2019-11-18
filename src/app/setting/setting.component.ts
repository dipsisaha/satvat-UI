import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';
import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constants = ApplicationConstants;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(type){

    if(type=="raw"){
      this.router.navigate(["/"+this.constants.ORG_USER+"/product"]);
    } else if (type=="finishedGoods"){
      this.router.navigate(["/"+this.constants.ORG_USER+"/finishedGoods"]);
    }  else if (type=="vendor"){
      this.router.navigate(["/"+this.constants.ORG_USER+"/vendor"]);
    }  else if (type=="companyProfile"){
      this.router.navigate(["/"+this.constants.ORG_USER+"/companyProfile"]);
    } else if (type=="customer"){
      this.router.navigate(["/"+this.constants.ORG_USER+"/customer"]);
    }
   
  }

}
