import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';
import { ProductService } from '../_services/product.service';

import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constants = ApplicationConstants;

  public listdata=[];
  public errorMsg;

  order: string = 'itemCode';
  reverse: any = {};
  orderType:string='date';
  reverseOrder: boolean= true;

  pagination={"itemsPerPage":15 , "currentPage":1}

  constructor(private _productService:ProductService,private router: Router) { }


  ngOnInit() {

    this._productService.getProductList()
    .subscribe(data =>{
      console.log(data)
                this.listdata   = data
                },
               error =>this.errorMsg  = error );
  }

  navigateToAddProduct() {
    this.router.navigate(["/"+this.constants.ORG_USER+"/addProduct"]);
  }

  updateProduct(productId){
    alert(productId)
    this.router.navigate(["/"+this.constants.ORG_USER+"/editProduct/"+productId]);
  }

  deleteProduct(productId){
    alert(productId)

    let requestJson = {};
    requestJson['itemCode'] = productId;
    this._productService.deleteProduct(requestJson)
    .subscribe(res =>{
               console.log(res)
               this.router.navigate(["/"+this.constants.ORG_USER+"/product"]);
              //  if(res.n == 1) {
              //    //alert(res.msg)
              //    //alert("CMS details updated sucessfully")
                 
              //  } else {
              //   alert("Not able to retreive Product Details")
              //  }
               },
               error =>this.errorMsg  = error ); 

    

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
  backToSetting(){
    this.router.navigate(["/"+this.constants.ORG_USER+"/setting"]);
  }


}
