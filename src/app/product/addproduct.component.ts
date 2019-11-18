import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot,ActivatedRoute } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { VendorService } from '../_services/vendor.service';

import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  model={rawMat:'Y',status:'A'}
  public errorMsg;

  constants = ApplicationConstants;
  currentURL='';
  public listVendordata=[];

  constructor(private _productService:ProductService,private router: Router,private route: ActivatedRoute,private _vendorService:VendorService) { }

  ngOnInit() {
    
    this.currentURL = window.location.pathname; 

    if (this.currentURL != "/"+this.constants.ORG_USER+"/addProduct") {

      let requestJson = {};

      requestJson['itemCode'] = this.route.snapshot.params.productId;



      this._productService.getProductById(requestJson)
      .subscribe(res =>{
                 console.log(res)

                 this.model=res[0];
                 },
                 error =>this.errorMsg  = error ); 

    }

    this._vendorService.getVendorList()
    .subscribe(data =>{
      console.log(data)
                this.listVendordata   = data
                },
               error =>this.errorMsg  = error );

  }

  backToProductList(){
    this.router.navigate(["/"+this.constants.ORG_USER+"/product"]);
  }

  submit(){

    let requestJson = {};

    requestJson['itemName'] = this.model['itemName'];
    requestJson['itemCode'] = this.model['itemCode'];
    requestJson['itemPrice'] = this.model['itemPrice'];
    requestJson['itemUnit'] = this.model['itemUnit'];
    requestJson['itemDescription'] = this.model['itemDescription'];
    requestJson['itemVat'] = this.model['itemVat'];
    requestJson['rawMat'] = this.model['rawMat'];
    requestJson['status'] = this.model['status'];
    requestJson['vendorId'] = this.model['vendorId'];
    requestJson['itemCD'] = this.model['itemCD'];
    requestJson['itemRD'] = this.model['itemRD'];
    requestJson['itemSD'] = this.model['itemSD'];
    requestJson['itemAIT'] = this.model['itemAIT'];
    requestJson['itemATV'] = this.model['itemATV'];
    requestJson['itemTTI'] = this.model['itemTTI'];

   
    console.log(requestJson)

    this._productService.addProduct(requestJson)
    .subscribe(res =>{
               console.log(res)
             
                 this.router.navigate(["/"+this.constants.ORG_USER+"/product"]);
              
               },
               error =>this.errorMsg  = error ); 
  }

  getProductDetailsById(productId) {

    
    let requestJson = {};

    requestJson['cmsType'] = productId;

    this._productService.getProductById(requestJson)
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
