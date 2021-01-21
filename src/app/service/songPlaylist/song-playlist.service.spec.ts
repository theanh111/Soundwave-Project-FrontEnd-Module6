import { TestBed } from '@angular/core/testing';

import { SongPlaylistService } from './song-playlist.service';

describe('SongPlaylistService', () => {
  let service: SongPlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongPlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
