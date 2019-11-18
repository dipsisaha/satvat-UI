import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot } from '@angular/router';
import { ApplicationConstants } from '../app.constants';
import { FinishedgoodsService } from '../_services/finishedgoods.service';

@Component({
  selector: 'app-finishedgoods',
  templateUrl: './finishedgoods.component.html',
  styleUrls: ['./finishedgoods.component.css']
})
export class FinishedgoodsComponent implements OnInit {

  constants = ApplicationConstants;

  public listdata=[];
  public errorMsg;

  order: string = 'itemCode';
  reverse: any = {};
  orderType:string='date';
  reverseOrder: boolean= true;

  pagination={"itemsPerPage":15 , "currentPage":1}

  constructor(private _goodsService:FinishedgoodsService,private router: Router) { }


  ngOnInit() {

    this._goodsService.getGoodsList()
    .subscribe(data =>{
      console.log(data)
                this.listdata   = data
                },
               error =>this.errorMsg  = error );
  }

  navigateToAddProduct() {
    this.router.navigate(["/"+this.constants.ORG_USER+"/addFinishedGoods"]);
  }

  updateProduct(productId){
    //alert(productId)
    this.router.navigate(["/"+this.constants.ORG_USER+"/editFinishedGoods/"+productId]);
  }

  deleteProduct(productId){
    //alert(productId)

    let requestJson = {};
    requestJson['itemCode'] = productId;
    this._goodsService.deleteGoods(requestJson)
    .subscribe(res =>{
               console.log(res)
               this.router.navigate(["/"+this.constants.ORG_USER+"/finishedGoods"]);
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
