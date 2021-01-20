import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICommentSong} from '../../model/comment/ICommentSong';
import {environment} from '../../../environments/environment';

const URL_API = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentSongService {

  constructor(private httpClient: HttpClient) {
  }

  getCommentBySongId(id: number): Observable<ICommentSong[]> {
    return this.httpClient.get<ICommentSong[]>(URL_API + `/comment-songs/song/${id}`);
  }

  addComment(commentSong: ICommentSong): Observable<ICommentSong> {
    return this.httpClient.post<ICommentSong>(URL_API + `/comment-songs`, commentSong);
  }
}
