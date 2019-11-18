import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';
import { VendorService } from '../_services/vendor.service';
import { PurchaseService } from '../_services/purchase.service';
import {IMyDrpOptions} from 'mydaterangepicker';

import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-purchasemanagement',
  templateUrl: './purchasemanagement.component.html',
  styleUrls: ['./purchasemanagement.component.css']
})
export class PurchasemanagementComponent implements OnInit {

  constants = ApplicationConstants;

  public listdata=[];
  public errorMsg;

  model={vendorId:''}
  public modeldate ={}

  order: string = 'empID';
  reverse: any = {};
  orderType:string='date';
  reverseOrder: boolean= true;
  public listVendordata=[];

  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'mmm dd yyyy',
    
  };

  pagination={"itemsPerPage":15 , "currentPage":1}

  constructor(private router: Router,private _vendorService:VendorService,private _purchaseService:PurchaseService) { }

  ngOnInit() {

    this._vendorService.getVendorList()
    .subscribe(data =>{
      console.log(data)
                this.listVendordata   = data
                },
               error =>this.errorMsg  = error );

  
    this._purchaseService.getPurchaseList()
    .subscribe(data =>{
      console.log(data)
                this.listdata   = data
                },
              error =>this.errorMsg  = error );
           

   
  }

  navigateToAddOrder() {
    this.router.navigate(["/"+this.constants.ORG_USER+"/addOrder"]);
  }

  Mushak(poNumber){
    this.router.navigate(["/"+this.constants.ORG_USER+"/mushok4.3/"+poNumber]);
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

}
