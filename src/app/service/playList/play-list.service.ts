import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Playlist} from '../../model/playList/playlist';
import {Observable} from 'rxjs';

const URL_API = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class PlayListService {

  constructor(private httpClient: HttpClient) { }

  savePlayList(playList: Playlist): Observable<any> {
    return this.httpClient.post<Playlist>(URL_API + `/playlists`, playList);
  }
  getAllPlaylist(): Observable<any> {
    return this.httpClient.get<Playlist>(URL_API + `/playlists`);
  }
  getOnePlaylist(id: number): Observable<any> {
    return this.httpClient.get<Playlist>(URL_API + `/playlists/${id}`);
  }
  getPlaylistsNewest(): Observable<any> {
    return this.httpClient.get<Playlist[]>(URL_API + `/playlists/date-new`);
  }
}
