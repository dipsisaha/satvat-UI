import { Component, OnInit } from '@angular/core';
import { Router,RouterStateSnapshot,ActivatedRoute } from '@angular/router';
import { PurchaseService } from '../_services/purchase.service';
import { ApplicationConstants } from '../app.constants';

@Component({
  selector: 'app-mushak-four-three',
  templateUrl: './mushak-four-three.component.html',
  styleUrls: ['./mushak-four-three.component.css']
})
export class MushakFourThreeComponent implements OnInit {

  model={rawMat:'N',status:'A'}
  public errorMsg;

  fieldArray: Array<any> = [];
  fieldExtraArray: Array<any> = [];
  fieldWastageArray: Array<any> = [];

  constructor(private _purchaseService:PurchaseService,private route: ActivatedRoute,private router: Router ) { }

  ngOnInit() {

    let requestJson = {};

    requestJson['poNumber'] = this.route.snapshot.params.poNumber;

    this._purchaseService.getPurchaseById(requestJson)
    .subscribe(res =>{
               console.log(res)

               this.model=res[0];
               this.fieldArray = res[0]["items"];
               this.fieldExtraArray = res[0]["extra"];
               this.fieldWastageArray = res[0]["wastage"];
               },
               error =>this.errorMsg  = error ); 
           
  }

}
