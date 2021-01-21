import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PlayList} from '../../model/playList/play-list';
import {Observable} from 'rxjs';

const URL_API = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class PlayListService {

  constructor(private httpClient: HttpClient) { }

  savePlayList(playList: PlayList): Observable<any> {
    return this.httpClient.post<PlayList>(URL_API + `/playlists`, playList);
  }
  getAllPlaylist(): Observable<any> {
    return this.httpClient.get<PlayList>(URL_API + `/playlists`);
  }
  getOnePlaylist(id: number): Observable<any> {
    return this.httpClient.get<PlayList>(URL_API + `/playlists/${id}`);
  }
  getPlaylistsNewest(): Observable<any> {
    return this.httpClient.get<PlayList[]>(URL_API + `/playlists/date-new`);
  }
}
