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
  getMyPlaylists(id: number): Observable<any> {
    return this.httpClient.get<Playlist[]>(URL_API + `/playlists/user/${id}`);
  }
  updateMyPlaylist(p_id: number, u_id: number, playlist: Playlist): Observable<any> {
    return this.httpClient.put<Playlist>(URL_API + `/playlists/${p_id}/${u_id}`,playlist );
  }
}
