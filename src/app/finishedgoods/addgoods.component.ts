import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot,ActivatedRoute } from '@angular/router';
import { FinishedgoodsService } from '../_services/finishedgoods.service';
import { VendorService } from '../_services/vendor.service';
import { ProductService } from '../_services/product.service';
import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-addgoods',
  templateUrl: './addgoods.component.html',
  styleUrls: ['./addgoods.component.css']
})
export class AddgoodsComponent implements OnInit {

  model={rawMat:'N',status:'A'}
  public errorMsg;

  constants = ApplicationConstants;
  currentURL='';
  public listVendordata=[];
  public productWithVendordata=[];

  butDisabled: boolean = true;

  rawmodel = {};
  fieldArray: Array<any> = [];
  rawMatDetails=''

  constructor(private _goodstService:FinishedgoodsService,private router: Router,private route: ActivatedRoute,private _vendorService:VendorService,private _productService:ProductService) { }

  ngOnInit() {
    
    this.currentURL = window.location.pathname; 

    if (this.currentURL != "/"+this.constants.ORG_USER+"/addFinishedGoods") {

      let requestJson = {};

      requestJson['itemCode'] = this.route.snapshot.params.productId;



      this._goodstService.getGoodsById(requestJson)
      .subscribe(res =>{
                 console.log(res)

                 this.model=res[0];
                 this.fieldArray = res[0]["rawMatItems"];
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
    this.router.navigate(["/"+this.constants.ORG_USER+"/finishedGoods"]);
  }

  submit(){

    let requestJson = {};

    requestJson['itemName'] = this.model['itemName'];
    console.log("CODE >> "+this.model['itemCode'])

    if (this.model['itemCode']){
      requestJson['itemCode'] = this.model['itemCode'];
    } else {
      requestJson['itemCode'] = "";
    }
    
    requestJson['itemPrice'] = this.model['itemPrice'];
    requestJson['itemUnit'] = this.model['itemUnit'];
    requestJson['itemDescription'] = this.model['itemDescription'];
    requestJson['itemVat'] = this.model['itemVat'];
    requestJson['status'] = this.model['status'];
    requestJson['vendorId'] = this.model['vendorId'];
    requestJson['itemCD'] = this.model['itemCD'];
    requestJson['itemRD'] = this.model['itemRD'];
    requestJson['itemSD'] = this.model['itemSD'];
    requestJson['itemAIT'] = this.model['itemAIT'];
    requestJson['itemATV'] = this.model['itemATV'];
    requestJson['itemTTI'] = this.model['itemTTI'];
    requestJson['rawMatItems'] = this.fieldArray

   
    console.log(requestJson)

    this._goodstService.addGoods(requestJson)
    .subscribe(res =>{
               console.log(res)
             
                 this.router.navigate(["/"+this.constants.ORG_USER+"/finishedGoods"]);
              
               },
               error =>this.errorMsg  = error ); 
  }

  getProductDetailsById(productId) {

    
    let requestJson = {};

    requestJson['cmsType'] = productId;

    this._goodstService.getGoodsById(requestJson)
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

  productDropDown() {
 
    //alert("vendor Id s>> "+this.model['vendorId'])
    //alert("Prod type >> "+this.prodType)
    
    let requestJson = {};
    
    
    requestJson['vendorId'] = this.model['vendorId'];
    requestJson['rawMat'] = "Y";
    
    
    
    this._productService.getProductListByVendorAndRaw(requestJson)
    .subscribe(res =>{
               console.log(res)
               this.productWithVendordata   = res;
               if (res.length != "") {
                this.butDisabled=false
                
               }
               },
               error =>this.errorMsg  = error ); 
    
    
    
    
       
      }

addRawMat(){
  console.log(this.rawmodel)
  
console.log(this.rawMatDetails)
this.rawmodel['itemName']=this.rawMatDetails['name']
this.rawmodel['itemCode']=this.rawMatDetails['id']
  this.fieldArray.push(this.rawmodel)
  this.rawmodel = {};
}
deleteFieldValue(index){
  this.fieldArray.splice(index, 1);
}

}
