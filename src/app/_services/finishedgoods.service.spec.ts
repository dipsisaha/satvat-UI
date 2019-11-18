import { TestBed, inject } from '@angular/core/testing';

import { FinishedgoodsService } from './finishedgoods.service';

describe('FinishedgoodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinishedgoodsService]
    });
  });

  it('should be created', inject([FinishedgoodsService], (service: FinishedgoodsService) => {
    expect(service).toBeTruthy();
  }));
});
