import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MushakFourThreeComponent } from './mushak-four-three.component';

describe('MushakFourThreeComponent', () => {
  let component: MushakFourThreeComponent;
  let fixture: ComponentFixture<MushakFourThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MushakFourThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MushakFourThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
