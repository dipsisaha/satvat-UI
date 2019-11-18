import { TestBed, inject } from '@angular/core/testing';

import { SidePanelService } from './sidepanel.service';

describe('SidePanelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidePanelService]
    });
  });

  it('should ...', inject([SidePanelService], (service: SidePanelService) => {
    expect(service).toBeTruthy();
  }));
});
