import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';
import { PurchaseService } from '../_services/purchase.service';
import { VendorService } from '../_services/vendor.service';
import { ProductService } from '../_services/product.service';
import { FinishedgoodsService } from '../_services/finishedgoods.service';

import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent implements OnInit {

  model={pType:'Y'}
  public errorMsg;
  public listVendordata=[];
  public productWithVendordata=[];
  vendordata={};

  constants = ApplicationConstants;
  butDisabled: boolean = true;
  public prodType;

  public isDetailsTabActive = true;
  public isExtraTabActive = false;
  public isWastageTabActive = false;

  prodModel = {};
  fieldArray: Array<any> = [];
  prodDetails=''
  today=''

  extraModel = {};
  fieldExtraArray: Array<any> = [];

  wastageModel = {};
  fieldWastageArray: Array<any> = [];
  public mTax=0;
  public mTotal=0;
  public mTotalRebate=0;
  public mGrandTotal=0;

  public extraTot =0 ;
  public wastageTot =0 ;

  constructor(private _purchaseService:PurchaseService,private router: Router, private _vendorService:VendorService, private _productService:ProductService,private _finishedgoodsService:FinishedgoodsService) { }
  ngOnInit() {

    this._vendorService.getVendorList()
    .subscribe(data =>{
      console.log(data)
                this.listVendordata   = data
                },
               error =>this.errorMsg  = error );
  }

  backToPurchaseOrderList(){
    this.router.navigate(["/"+this.constants.ORG_USER+"/purchaseOrderList"]);
  }

  submit(){

    let requestJson = {};
   

    requestJson['vendorId'] = this.model['vendorId'];
    requestJson['vendorName'] = this.vendordata['vendorName'];
    requestJson['vendorAddress'] = this.vendordata['emailId'];
    requestJson['vendorContactNumber'] = this.vendordata['vendorContactNumber'];
    requestJson['inventory'] = this.model['pType'];
    requestJson['totalAmount'] = this.mTotal;
    requestJson['totalTax'] = this.mTax;
    requestJson['totalRebate'] = this.mTotalRebate;
    requestJson['grandTotal'] = this.mGrandTotal;
    requestJson['items'] = this.fieldArray;
    requestJson['extra'] = this.fieldExtraArray;
    requestJson['totalExtra'] = this.extraTot;
    requestJson['wastage'] = this.fieldWastageArray;
    requestJson['totalWatage'] = this.wastageTot;
    requestJson['poDate'] = this.getDate();
   
    console.log(requestJson)

    this._purchaseService.addPurchaseOrder(requestJson)
    .subscribe(res =>{
               console.log(res)
               //if(res.n == 1) {
                 //alert(res.msg)
                 //alert("CMS details updated sucessfully")
                 this.router.navigate(["/"+this.constants.ORG_USER+"/purchaseOrderList"]);
              //  } else {
              //   alert("Product Details can't be updated")
              //  }
               },
               error =>this.errorMsg  = error ); 
  }

  getProductDetailsById(productId) {

    
    let requestJson = {};

    requestJson['cmsType'] = productId;

    this._purchaseService.getPurchaseById(requestJson)
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

  productDropDown(type,event) {
 
if(type =='pType') {
  this.prodType= event.target.defaultValue
} else {
  this.prodType= this.model['pType']
}
//alert("vendor Id s>> "+this.model['vendorId'])
//alert("Prod type >> "+this.prodType)

let requestJson = {};


requestJson['vendorId'] = this.model['vendorId'];
requestJson['rawMat'] = this.prodType;

if (this.prodType == "Y") {

  this._productService.getProductListByVendorAndRaw(requestJson)
  .subscribe(res =>{
           console.log(res)
           this.productWithVendordata   = res;
           if (res.length != "") {
            this.butDisabled=false
            
           }
           },
           error =>this.errorMsg  = error ); 


} else {
  this._finishedgoodsService.getGoodsListByVendor(requestJson)
  .subscribe(res =>{
           console.log(res)
           this.productWithVendordata   = res;
           if (res.length != "") {
            this.butDisabled=false
            
           }
           },
           error =>this.errorMsg  = error ); 
}





   
  }


  getVendorDetails() {
    let vendorRequestJson = {};
    vendorRequestJson['vendorId'] = this.model['vendorId'];

    this._vendorService.getVendorById(vendorRequestJson).subscribe(res =>{
                              console.log(res)
                              this.vendordata   = res[0];
                              },
                              error =>this.errorMsg  = error ); 

  }
  backToOrderList(){
    this.router.navigate(["/"+this.constants.ORG_USER+"/purchaseOrderList"]);
  }

  addProduct(){
    
  console.log(this.prodDetails)
  this.prodDetails['rebate'] =0
  this.prodModel['itemName']=this.prodDetails['name']
  this.prodModel['itemCode']=this.prodDetails['id']
  this.prodModel['itemVat']=this.prodDetails['vat']
  this.prodModel['itemCD']=this.prodDetails['CD']
  this.prodModel['itemRD']=this.prodDetails['RD']
  this.prodModel['itemSD']=this.prodDetails['SD']
  this.prodModel['itemAIT']=this.prodDetails['AIT']
  this.prodModel['itemATV']=this.prodDetails['ATV']
  this.prodModel['itemTTI']=this.prodDetails['TTI']
  this.prodModel['itemPrice']=this.prodDetails['price']
  this.prodModel['itemUnit']=this.prodDetails['unit']
  this.prodModel['itemRebate']=this.prodDetails['rebate']
  var itemAV = this.prodDetails['price'] * this.prodModel['quantity']
  var calCD = this.calPercentage(this.prodDetails['CD'],itemAV)
  var calRD = this.calPercentage(this.prodDetails['RD'],itemAV)
  var calSD = this.calPercentage(this.prodDetails['SD'],itemAV)
  var calVat = this.calPercentage(this.prodDetails['vat'],itemAV)
  console.log("calVat >>"+calVat)
  var calAIT = this.calPercentage(this.prodDetails['AIT'],itemAV)
  var calATV = this.calPercentage(this.prodDetails['ATV'],itemAV)
  var calRebate = this.calPercentage(this.prodDetails['rebate'],itemAV)
  this.prodModel['itemAV']= itemAV
  this.prodModel['itemCalCD']= calCD
  this.prodModel['itemCalSD']= calSD
  this.prodModel['itemCalRD']= calRD
  this.prodModel['itemCalVat']= calVat
  this.prodModel['itemCalAIT']=calAIT
  this.prodModel['itemCalATV']=calATV
  this.prodModel['itemCalRebate']=calRebate
  this.fieldArray.push(this.prodModel)
  this.prodModel = {};

  console.log(this.fieldArray)
  console.log(this.fieldArray.length)

  var tot =0
  var total =0
  var totalRebate =0
  var tax =0
  var grandTotal=0

  for(var i=0;i<this.fieldArray.length;i++){

    tot += parseInt(this.fieldArray[i]['itemCalCD'])+ parseInt(this.fieldArray[i]['itemCalSD'])+parseInt(this.fieldArray[i]['itemCalRD'])+parseInt(this.fieldArray[i]['itemCalVat'])+parseInt(this.fieldArray[i]['itemCalAIT'])+parseInt(this.fieldArray[i]['itemCalATV'])+parseInt(this.fieldArray[i]['itemTTI'])
    total =  total+parseInt(this.fieldArray[i]['itemAV'])
    totalRebate =  totalRebate+parseInt(this.fieldArray[i]['itemRebate'])
   // console.log("tax"+this.tax)
    
  }
  tax =  tax+tot
  grandTotal =  (tax +total)-totalRebate

  this.mTax = tax
  this.mTotal = total
  this.mTotalRebate = totalRebate
  this.mGrandTotal = grandTotal
  

  }
  deleteFieldValue(index){
    this.fieldArray.splice(index, 1);

  var tot =0
  var total =0
  var totalRebate =0
  var tax =0
  var grandTotal=0

  for(var i=0;i<this.fieldArray.length;i++){

    tot += parseInt(this.fieldArray[i]['itemCalCD'])+ parseInt(this.fieldArray[i]['itemCalSD'])+parseInt(this.fieldArray[i]['itemCalRD'])+parseInt(this.fieldArray[i]['itemCalVat'])+parseInt(this.fieldArray[i]['itemCalAIT'])+parseInt(this.fieldArray[i]['itemCalATV'])+parseInt(this.fieldArray[i]['itemTTI'])
    total =  total+parseInt(this.fieldArray[i]['itemAV'])
    totalRebate =  totalRebate+parseInt(this.fieldArray[i]['itemRebate'])
   // console.log("tax"+this.tax)
    
  }
  tax =  tax+tot
  grandTotal =  (tax +total)-totalRebate

  this.mTax = tax
  this.mTotal = total
  this.mTotalRebate = totalRebate
  this.mGrandTotal = grandTotal
    
  }
  
  calPercentage(interest,principal){
    var val = (interest *principal)/100
    console.log("val >>"+val)
    return val.toFixed(3)
  }


  addExtra(){
   
    if(Object.keys(this.extraModel).length >0){
      this.fieldExtraArray.push(this.extraModel)
      this.extraTot = this.addition(this.fieldExtraArray,"cost")
      this.extraModel = {};
    } else {
      alert("Field cannot be blank")
    }
    
  }
  deleteExtraFieldValue(index){
    this.fieldExtraArray.splice(index, 1);
    this.extraTot = this.addition(this.fieldExtraArray,"cost")
  }

  addWastage(){
    
    if(Object.keys(this.wastageModel).length >0){
      this.fieldWastageArray.push(this.wastageModel)
      this.wastageTot = this.addition(this.fieldWastageArray,"price")
      this.wastageModel = {};
    } else {
      alert("Field cannot be blank")
    }
    
  }
  deleteWastageFieldValue(index){
    this.fieldWastageArray.splice(index, 1);
    this.wastageTot = this.addition(this.fieldWastageArray,"price")
  }

  openTab(tabType){
   
    if (tabType == "details") {
      this.isDetailsTabActive = true;
      this.isExtraTabActive = false;
      this.isWastageTabActive = false;
    } else if (tabType == "extra") {
      this.isDetailsTabActive = false;
      this.isExtraTabActive = true;
      this.isWastageTabActive = false;
    }
    else if (tabType == "wastage") {
      this.isDetailsTabActive = false;
      this.isExtraTabActive = false;
      this.isWastageTabActive = true;
    }
  }

  addition(arr,type){
    var totalVal=0
    for(var i=0;i<arr.length;i++){
      totalVal += parseInt(arr[i][type])
    }
   return totalVal
  }

  getDate() {

    var d = new Date();
    var dd = d.getDate(); 
    var mm = d.getMonth() + 1; 
    var newdd=""
    var newmm=""
    var yyyy = d.getFullYear(); 
    if (dd < 10) { 
        newdd = '0' + dd.toString(); 
    }  else {
      newdd = dd.toString(); 
    }
    if (mm < 10) { 
        newmm = '0' + mm.toString();
    }  else {
      newmm  = mm.toString();
    }
     this.today = newdd + '/' + newmm + '/' + yyyy.toString(); 

    return this.today
  }


}