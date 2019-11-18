import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private panelId = new BehaviorSubject('1');
  currentPanelId = this.panelId.asObservable();
  
  private orgId = new BehaviorSubject('1');
  currentOrgId = this.orgId.asObservable();

  constructor() { }

  changePanel(panel: string) {
    this.panelId.next(panel);
  }

  changeOrg(org:string){
  	this.orgId.next(org);
  }
}