import { TestBed } from '@angular/core/testing';

import { CommentPlaylistService } from './comment-playlist.service';

describe('CommentPlaylistService', () => {
  let service: CommentPlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentPlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
