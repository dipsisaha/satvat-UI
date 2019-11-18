import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';
import { VendorService } from '../_services/vendor.service';

import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  constants = ApplicationConstants;

  public listdata=[];
  public errorMsg;

  order: string = 'vendorId';
  reverse: any = {};
  orderType:string='date';
  reverseOrder: boolean= true;

  pagination={"itemsPerPage":15 , "currentPage":1}

  constructor(private _vendorService:VendorService,private router: Router) { }

  ngOnInit() {

    this._vendorService.getVendorList()
    .subscribe(data =>{
      console.log(data)
                this.listdata   = data
                },
               error =>this.errorMsg  = error );
  }

  navigateToAddVendor() {
    this.router.navigate(["/"+this.constants.ORG_USER+"/addVendor"]);
  }

  setOrder(value: string,type:string,reverse) {
    
    if(typeof this.reverse[value] == 'undefined'){
    	this.orderType = type;    	
    	this.order = value;
    	this.reverseOrder = true;
    	this.reverse[value] = true;
    	return true
    }
   
   	this.orderType = type;   	
    this.reverse[value] = !this.reverse[value];
    this.reverseOrder = this.reverse[value];
   
    this.order = value;
   
  }

  updateVendor(vendorId){
    alert(vendorId)
    this.router.navigate(["/"+this.constants.ORG_USER+"/editVendor/"+vendorId]);
  }
  backToSetting(){
    this.router.navigate(["/"+this.constants.ORG_USER+"/setting"]);
  }

}
