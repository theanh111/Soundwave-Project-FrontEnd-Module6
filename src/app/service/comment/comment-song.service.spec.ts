import { TestBed } from '@angular/core/testing';

import { CommentSongService } from './comment-song.service';

describe('CommentSongService', () => {
  let service: CommentSongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentSongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
