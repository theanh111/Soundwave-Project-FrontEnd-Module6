import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ISong} from '../../model/song/ISong';

const UPR_API = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class SongPlaylistService {

  constructor(private httpClient: HttpClient) { }
  addSongToPlaylist(p_id: number, song: ISong): Observable<any> {
    return this.httpClient.post<ISong>(UPR_API + `/song-playlists/${p_id}`, song);
  }
  checkSongPlaylist(p_id: number, song: ISong): Observable<any> {
    return this.httpClient.post<boolean>(UPR_API + `/song-playlists/check-song/${p_id}`, song);
  }
}
