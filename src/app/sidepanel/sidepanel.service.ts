import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { ApplicationSettings } from '../app.config'
import { Router } from '@angular/router';
import { SidePanelData } from '../_model/sidepanel-data.model';
import { OrgConfig } from './sidepanel-org-config.model';
import { ApplicationConstants } from '../app.constants'

@Injectable()
export class SidePanelService {
      private _config: OrgConfig[] = [            
            {
                "panelId": ApplicationConstants.ORG_USER,
                "menuList": [
                               {"id":ApplicationConstants.DASHBOARD_PANEL_ID,"description":"Dashboard","link":"/"+ApplicationConstants.ORG_USER+"/dashboard/","icon":"home.png"},
                               {"id":ApplicationConstants.SETTING_PANEL_ID,"description":"Settings","link":"/"+ApplicationConstants.ORG_USER+"/setting/","icon":"setting.png"},
                        // {"id":ApplicationConstants.VENDOR_PANEL_ID,"description":"Manage Vendor","link":"/"+ApplicationConstants.ORG_USER+"/vendor/","icon":"vendor.png"},
                        // {"id":ApplicationConstants.PRODUCT_PANEL_ID,"description":"Manage Raw Product","link":"/"+ApplicationConstants.ORG_USER+"/product/","icon":"product.png"},
                        // {"id":ApplicationConstants.FINISH_GOODS_PANEL_ID,"description":"Manage Finished Goods","link":"/"+ApplicationConstants.ORG_USER+"/finishedGoods/","icon":"product.png"},
                        {"id":ApplicationConstants.PURCHASE_PANEL_ID,"description":"Manage Purchase Order","link":"/"+ApplicationConstants.ORG_USER+"/purchaseOrderList/","icon":"po.png"},
                  ] //provide menu items, each element in mennuList would be a menu item
            },
            // {
            //       "panelId": ApplicationConstants.ORG_USER,
            //       "roleId": ApplicationConstants.LOGIN_AS_EMPLOYEE,
            //       "menuList": [
            //                      {"id":ApplicationConstants.DASHBOARD_PANEL_ID,"description":"Dashboard","link":"/"+ApplicationConstants.ORG_USER+"/dashboard/","icon":""},
            //               {"id":ApplicationConstants.EMPLOYEE_DETAILS_PANEL_ID,"description":"Manage Personal Info","link":"/"+ApplicationConstants.ORG_USER+"/addEmployeeDetails/","icon":""}
            //               // {"id":ApplicationConstants.PO_PANEL_ID,"description":"Purchase Orders","link":"/"+ApplicationConstants.ORG_USER+"/purchaseorder/","icon":""}
            //         ] //provide menu items, each element in mennuList would be a menu item
            //   }
            
      ];
      private _showSidePanel: BehaviorSubject<SidePanelData> = new BehaviorSubject<SidePanelData>(null);
      public showSidePanelEmitter: Observable<SidePanelData> = this._showSidePanel.asObservable();

      constructor(private http: Http) { }


      showSidePanel(ifShow: boolean,orgId:string, panelId: string,stateUrl:string) {
            this._showSidePanel.next(new SidePanelData(ifShow,orgId, panelId,stateUrl));
      }
      
      loadConfig(): OrgConfig[] {
            return this._config;
      }
      
}
