import { Routes } from '@angular/router'; 
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { VendorComponent } from './vendor/vendor.component'
import { AddvendorComponent } from './vendor/addvendor.component';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './product/addproduct.component';
import { PurchasemanagementComponent } from './purchasemanagement/purchasemanagement.component';
import { AddorderComponent } from './purchasemanagement/addorder.component';
import { FinishedgoodsComponent } from './finishedgoods/finishedgoods.component';
import { AddgoodsComponent } from './finishedgoods/addgoods.component';
import { MushakFourThreeComponent } from './purchasemanagement/mushak-four-three.component';
import { SettingComponent } from './setting/setting.component';
import { CompanyProfileComponent } from './setting/company-profile.component';
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './customer/add-customer.component';

import { ApplicationConstants } from './app.constants'
import { NavigationGuard} from './_guard/navigation.guard' 

export const AppRoutes:Routes = [
    { path :'',component : LoginComponent,data:{org:ApplicationConstants.ORG_USER,title: "VAT Login"}},
    { path : 'login/VAT',component :LoginComponent,data:{org:ApplicationConstants.ORG_USER,title: "VAT Login"}}, 
    { path : ApplicationConstants.ORG_USER+'/dashboard',component :DashboardComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/vendor',component :VendorComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/addVendor',component :AddvendorComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/editVendor/:vendorId',component :AddvendorComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/product',component :ProductComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/addProduct',component :AddproductComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/editProduct/:productId',component :AddproductComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/purchaseOrderList',component :PurchasemanagementComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/addOrder',component :AddorderComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/finishedGoods',component :FinishedgoodsComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/addFinishedGoods',component :AddgoodsComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/editFinishedGoods/:productId',component :AddgoodsComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/mushok4.3/:poNumber',component :MushakFourThreeComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/setting',component :SettingComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/companyProfile',component :CompanyProfileComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/customer',component :CustomerComponent,canActivate:[NavigationGuard]},
    { path : ApplicationConstants.ORG_USER+'/addCustomer',component :AddCustomerComponent,canActivate:[NavigationGuard]},

    { path : '**',component : LoginComponent,data:{org:ApplicationConstants.ORG_USER,title: "VAT Login"}},
];