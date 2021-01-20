import { TestBed } from '@angular/core/testing';

import { PlayListService } from './play-list.service';

describe('PlayListService', () => {
  let service: PlayListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
