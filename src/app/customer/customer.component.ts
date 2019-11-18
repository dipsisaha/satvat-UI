import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';

import { ApplicationConstants } from '../app.constants';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constants = ApplicationConstants;
  public listdata=[];
  public errorMsg;

  order: string = 'customerId';
  reverse: any = {};
  orderType:string='date';
  reverseOrder: boolean= true;

  pagination={"itemsPerPage":15 , "currentPage":1}

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToAddCustomer() {
    this.router.navigate(["/"+this.constants.ORG_USER+"/addCustomer"]);
  }


  backToSetting(){
    this.router.navigate(["/"+this.constants.ORG_USER+"/setting"]);
  }

}
