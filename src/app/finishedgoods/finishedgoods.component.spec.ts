import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedgoodsComponent } from './finishedgoods.component';

describe('FinishedgoodsComponent', () => {
  let component: FinishedgoodsComponent;
  let fixture: ComponentFixture<FinishedgoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedgoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedgoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
