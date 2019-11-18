import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { AppRoutes } from './app.routes';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {TabModule} from 'angular-tabs-component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { CeilPipe } from 'angular-pipes';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CKEditorModule } from 'ng2-ckeditor';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component'
import { SidePanelComponent } from './sidepanel/sidepanel.component'
import { DashboardComponent } from './dashboard/dashboard.component';


import { NavbarService } from './navbar/navbar.service'
import { SidePanelService } from './sidepanel/sidepanel.service'
import { CommonService } from './_services/common.service';
import { TitleService } from './_services/title.service';
import { AuthenticationService } from './_services/authentication.service';
import { ExcelService } from './_services/excel.service';
import { DataService } from "./_services/data.service";
import { VendorService } from './_services/vendor.service';
import { ProductService } from './_services/product.service';
import { PurchaseService } from './_services/purchase.service';

import { SpinnerComponent } from './_helper/spinner.component';

import { SortPipe } from './_pipe/sort.pipe';
import { DateFormatPipe } from './_pipe/dateformat.pipe';

import { TokenInterceptor} from './_interceptor/tokeninterceptor.interceptor';

import { NavigationGuard} from './_guard/navigation.guard';
import { VendorComponent } from './vendor/vendor.component';
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



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SpinnerComponent,
    SortPipe,
    DashboardComponent,
    SidePanelComponent,
    DateFormatPipe,
    CeilPipe,
    VendorComponent,
    AddvendorComponent,
    ProductComponent,
    AddproductComponent,
    PurchasemanagementComponent,
    AddorderComponent,
    FinishedgoodsComponent,
    AddgoodsComponent,
    MushakFourThreeComponent,
    SettingComponent,
    CompanyProfileComponent,
    CustomerComponent,
    AddCustomerComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule ,
    RouterModule.forRoot(AppRoutes,{onSameUrlNavigation: 'reload'}),
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    MyDateRangePickerModule,
    MyDatePickerModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    TabModule,
    NgSelectModule ,
    NgIdleKeepaliveModule.forRoot(),
    PerfectScrollbarModule,
    CKEditorModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: PERFECT_SCROLLBAR_CONFIG,useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}, 		
  	NavbarService,CommonService,TitleService,AuthenticationService,SidePanelService,ExcelService,ProductService,VendorService,PurchaseService,DataService,NavigationGuard
  	],
  bootstrap: [AppComponent]
})

export class AppModule { 
	constructor(titleService: TitleService) {
    titleService.init();
  }
}
