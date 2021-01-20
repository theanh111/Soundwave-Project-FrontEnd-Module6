import { TestBed } from '@angular/core/testing';

import { LikeSongService } from './like-song.service';

describe('LikeSongService', () => {
  let service: LikeSongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikeSongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
