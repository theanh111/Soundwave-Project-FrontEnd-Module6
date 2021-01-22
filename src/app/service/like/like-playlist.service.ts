import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {LikeSong} from '../../model/likeSong/like-song';
import {ISong} from '../../model/song/ISong';
import {Playlist} from '../../model/playList/playlist';
import {LikePlaylist} from '../../model/likePlaylist/like-playlist';
const URL_API = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class LikePlaylistService {

  constructor(private httpClient: HttpClient) { }
  likePlaylist(p_id: number, u_id: number): Observable<any> {
    return this.httpClient.post<LikePlaylist>(URL_API + `/like-playlists/like/${p_id}/${u_id}`, p_id);
  }
  getAllLikeUser(id: number): Observable<any> {
    return this.httpClient.get<Playlist[]>(URL_API + `/like-playlists/all-like/${id}`);
  }
  // getSongMostLike(): Observable<any> {
  //   return this.httpClient.get<Playlist[]>(URL_API + `/like-playlists/most-likes`);
  // }
  getLikePlaylist(id: number): Observable<any> {
    return this.httpClient.get<number>(URL_API + `/like-playlists/like/${id}`);
  }
}
