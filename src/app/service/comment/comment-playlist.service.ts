import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ICommentSong} from '../../model/comment/ICommentSong';
import {ICommentPlaylist} from '../../model/comment/icomment-playlist';
const URL_API = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CommentPlaylistService {

  constructor(private httpClient: HttpClient) { }
  getCommentByPlaylistId(id: number): Observable<ICommentSong[]> {
    return this.httpClient.get<ICommentSong[]>(URL_API + `/comment-playlists/comment/${id}`);
  }

  addComment(commentPlaylist: ICommentPlaylist): Observable<any> {
    return this.httpClient.post<ICommentPlaylist>(URL_API + `/comment-playlists`, commentPlaylist);
  }
}
