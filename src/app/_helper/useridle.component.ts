import { Component, OnInit, ViewChild , EventEmitter} from '@angular/core';
import { NgbModal, ModalDismissReasons,NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '../_services/common.service' ;

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  closeResult: string;
  activeModal: NgbModalRef;
  
  @ViewChild('spinner') spinner;
  
  constructor(private modalService: NgbModal,private commonService:CommonService) { 
    
  }

  ngOnInit() {
  }

 openSpinner() {
    let opts:NgbModalOptions = {backdrop:'static',size:'sm', windowClass: 'spinnerWindow' };
    this.activeModal =this.modalService.open(this.spinner,opts);
    this.activeModal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }
  
  closeSpinner(){
    this.activeModal.close("Closed Programatically");
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
