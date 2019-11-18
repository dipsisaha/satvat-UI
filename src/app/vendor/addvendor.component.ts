import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot ,ActivatedRoute} from '@angular/router';
import { VendorService } from '../_services/vendor.service';

import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-addvendor',
  templateUrl: './addvendor.component.html',
  styleUrls: ['./addvendor.component.css']
})
export class AddvendorComponent implements OnInit {

  model={}
  public errorMsg;

  constants = ApplicationConstants;
  currentURL='';

  constructor(private _vendorService:VendorService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {

    this.currentURL = window.location.pathname; 

    if (this.currentURL != "/"+this.constants.ORG_USER+"/addVendor") {

      let requestJson = {};

      requestJson['vendorId'] = this.route.snapshot.params.vendorId;



      this._vendorService.getVendorById(requestJson)
      .subscribe(res =>{
                 console.log(res)

                 this.model=res[0];
                 },
                 error =>this.errorMsg  = error ); 

    }
  }

  backToVendorList(){
    this.router.navigate(["/"+this.constants.ORG_USER+"/vendor"]);
  }

  submit(){

    let requestJson = {};

    requestJson['vendorName'] = this.model['vendorName'];
    requestJson['vendorAddress'] = this.model['vendorAddress'];
    requestJson['vendorContactNumber'] = this.model['vendorContactNumber'];
    requestJson['emailId'] = this.model['emailId'];
   
    console.log(requestJson)

    this._vendorService.addVendor(requestJson)
    .subscribe(res =>{
               console.log(res)
              // if(res.n == 1) {
                 //alert(res.msg)
                 //alert("CMS details updated sucessfully")
                 this.router.navigate(["/"+this.constants.ORG_USER+"/vendor"]);
              //  } else {
              //   alert("Product Details can't be updated")
              //  }
               },
               error =>this.errorMsg  = error ); 
  }

  getVendorDetailsById(vendorId) {

    
    let requestJson = {};

    requestJson['cmsType'] = vendorId;

    this._vendorService.getVendorById(requestJson)
    .subscribe(res =>{
               console.log(res)
               this.model   = res;
              //  if(res.n == 1) {
              //    //alert(res.msg)
              //    //alert("CMS details updated sucessfully")
                 
              //  } else {
              //   alert("Not able to retreive Product Details")
              //  }
               },
               error =>this.errorMsg  = error ); 

  }

}
