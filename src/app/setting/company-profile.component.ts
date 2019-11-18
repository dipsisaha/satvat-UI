import { Component, OnInit } from '@angular/core';

import { Router,RouterStateSnapshot } from '@angular/router';
import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  constants = ApplicationConstants;

  constructor(private router: Router) { }

  model = {};
  addressmodal ={};
  public errorMsg;

  public isBasicTabActive = true;
  public isBankTabActive = false;
  public isCompanyTabActive = false;
  public isAddressTabActive = false;
  public isContactTabActive = false;

  ngOnInit() {
  }
  backToSetting(){
    this.router.navigate(["/"+this.constants.ORG_USER+"/setting"]);
  }

  openTab(tabType){

    this.isBasicTabActive = false;
    this.isBankTabActive = false;
    this.isCompanyTabActive = false;
    this.isAddressTabActive = false;
    this.isContactTabActive = false;
   
    if (tabType == "basic") {
      this.isBasicTabActive = true;  
    } else if (tabType == "bank") {
      this.isBankTabActive = true;  
    } else if (tabType == "company") {
      this.isCompanyTabActive = true;
    } else if (tabType == "address") {    
      this.isAddressTabActive = true;
    } else if (tabType == "contact") {
      this.isContactTabActive = true
    }
    
  }

  sameAsBilling(event){
    if ( event.target.checked ) {
      this.addressmodal["shippingaddr_house"]=this.addressmodal["billingaddr_house"]
      this.addressmodal["shippingaddr_road"]=this.addressmodal["billingaddr_road"]
      this.addressmodal["shippingaddr_sector"]=this.addressmodal["billingaddr_sector"]
      this.addressmodal["shippingaddr_thana"]=this.addressmodal["billingaddr_thana"]
      this.addressmodal["shippingaddr_city"]=this.addressmodal["billingaddr_city"]
      this.addressmodal["shippingaddr_district"]=this.addressmodal["billingaddr_district"]
      this.addressmodal["shippingaddr_postcode"]=this.addressmodal["billingaddr_postcode"]
      this.addressmodal["shippingaddr_country"]=this.addressmodal["billingaddr_country"]
    } else {
      this.addressmodal["shippingaddr_house"]=""
      this.addressmodal["shippingaddr_road"]=""
      this.addressmodal["shippingaddr_sector"]=""
      this.addressmodal["shippingaddr_thana"]=""
      this.addressmodal["shippingaddr_city"]=""
      this.addressmodal["shippingaddr_district"]=""
      this.addressmodal["shippingaddr_postcode"]=""
      this.addressmodal["shippingaddr_country"]=""
    }
   
    
   
  }

}
