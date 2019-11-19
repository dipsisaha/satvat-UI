import { Component, OnInit } from '@angular/core';

import { Router,RouterStateSnapshot } from '@angular/router';
import { ApplicationConstants } from '../app.constants';
import { CompanyService } from '../_services/company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  constants = ApplicationConstants;

  constructor(private router: Router,private _companyService:CompanyService) { }

  model = {};
  addressmodal ={};
  contactmodal ={};
  public errorMsg;

  fieldArray: Array<any> = [];

  public isBasicTabActive = true;
  public isBankTabActive = false;
  public isCompanyTabActive = false;
  public isAddressTabActive = false;
  public isContactTabActive = false;

  ngOnInit() {

    let requestJson = {};

    requestJson['companyId'] = this.constants.COMPANY_ID


    this._companyService.getCompanyDetails(requestJson)
    .subscribe(res =>{
               console.log(res)

               this.model=res[0];
               this.addressmodal["billingaddr_house"]=res[0]["billingaddr_house"]
               this.addressmodal["billingaddr_road"]=res[0]["billingaddr_road"]
               this.addressmodal["billingaddr_city"]=res[0]["billingaddr_city"]
               this.addressmodal["billingaddr_country"]=res[0]["billingaddr_country"]
               this.addressmodal["billingaddr_district"]=res[0]["billingaddr_district"]
               this.addressmodal["billingaddr_postcode"]=res[0]["billingaddr_postcode"]
               this.addressmodal["billingaddr_sector"]=res[0]["billingaddr_sector"]
               this.addressmodal["billingaddr_thana"]=res[0]["billingaddr_thana"]          
               this.addressmodal["shippingaddr_city"]=res[0]["shippingaddr_city"]
               this.addressmodal["shippingaddr_country"]=res[0]["shippingaddr_country"]
               this.addressmodal["shippingaddr_district"]=res[0]["shippingaddr_district"]
               this.addressmodal["shippingaddr_house"]=res[0]["shippingaddr_house"]
               this.addressmodal["shippingaddr_postcode"]=res[0]["shippingaddr_postcode"]
               this.addressmodal["shippingaddr_road"]=res[0]["shippingaddr_road"]
               this.addressmodal["shippingaddr_sector"]=res[0]["shippingaddr_sector"]
               this.addressmodal["shippingaddr_thana"]=res[0]["shippingaddr_thana"]

               this.fieldArray = this.model['contacts']
               
               },
               error =>this.errorMsg  = error );

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

  submit() {

    let requestJson = {};

    requestJson['companyId'] = this.model['companyId'];
    requestJson['cname'] = this.model['cname'];
    requestJson['shortName'] = this.model['shortName'];
    requestJson['cmobile'] = this.model['cmobile'];
    requestJson['cemail'] = this.model['cemail'];
    requestJson['cfax'] = this.model['cfax'];
    requestJson['caltMobile'] = this.model['caltMobile'];
    requestJson['caltEmail'] = this.model['caltEmail'];
    requestJson['cskype'] = this.model['cskype'];
    requestJson['cwhatsApp'] = this.model['cwhatsApp'];
    requestJson['cfacebook'] = this.model['cfacebook'];
    requestJson['cwebsite'] = this.model['cwebsite'];
    requestJson['accountsName'] = this.model['accountsName'];
    requestJson['accountsNo'] = this.model['accountsNo'];
    requestJson['bankName'] = this.model['bankName'];
    requestJson['branchName'] = this.model['branchName'];
    requestJson['routingNo'] = this.model['routingNo'];
    requestJson['swiftCode'] = this.model['swiftCode'];
    requestJson['foundedOn'] = this.model['foundedOn'];
    requestJson['bin'] = this.model['bin'];
    requestJson['eTin'] = this.model['eTin'];
    requestJson['ircNo'] = this.model['ircNo'];
    requestJson['ercNo'] = this.model['ercNo'];
    requestJson['vatRegNo'] = this.model['vatRegNo'];
    requestJson['areaCode'] = this.model['areaCode'];
    requestJson['tradeLisenceNo'] = this.model['tradeLisenceNo'];
    requestJson['IncorporationCertificateNo'] = this.model['IncorporationCertificateNo'];
    requestJson['billingaddr_house'] = this.addressmodal['billingaddr_house'];
    requestJson['billingaddr_road'] = this.addressmodal['billingaddr_road'];
    requestJson['billingaddr_sector'] = this.addressmodal['billingaddr_sector'];
    requestJson['billingaddr_thana'] = this.addressmodal['billingaddr_thana'];
    requestJson['billingaddr_postcode'] = this.addressmodal['billingaddr_postcode'];
    requestJson['billingaddr_city'] = this.addressmodal['billingaddr_city'];
    requestJson['billingaddr_district'] = this.addressmodal['billingaddr_district'];
    requestJson['billingaddr_country'] = this.addressmodal['billingaddr_country'];
    requestJson['shippingaddr_house'] = this.addressmodal['shippingaddr_house'];
    requestJson['shippingaddr_road'] = this.addressmodal['shippingaddr_road'];
    requestJson['shippingaddr_sector'] = this.addressmodal['shippingaddr_sector'];
    requestJson['shippingaddr_thana'] = this.addressmodal['shippingaddr_thana'];
    requestJson['shippingaddr_postcode'] = this.addressmodal['shippingaddr_postcode'];
    requestJson['shippingaddr_city'] = this.addressmodal['shippingaddr_city'];
    requestJson['shippingaddr_district'] = this.addressmodal['shippingaddr_district'];
    requestJson['shippingaddr_country'] = this.addressmodal['shippingaddr_country'];
    requestJson['contacts'] = this.fieldArray;

console.log(requestJson)
   this._companyService.updateCompany(requestJson)
   .subscribe(res =>{
              console.log(res)
             alert("Successfully Updated")
              //this.router.navigate(["/"+this.constants.ORG_USER+"/companyProfile"]);
              window.location.reload();
              },
              error =>this.errorMsg  = error );

    
  }

  addContact() {

    console.log(this.contactmodal)
  
    this.fieldArray.push(this.contactmodal)
    this.contactmodal = {};
  
  }

  deleteContactFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

}
