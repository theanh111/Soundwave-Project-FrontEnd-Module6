import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {LikeSong} from '../../model/likeSong/like-song';
import {ISong} from '../../model/song/ISong';
const URL_API = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class LikeSongService {

  constructor(private httpClient: HttpClient) { }
  likeSong(s_id: number, u_id: number): Observable<any> {
    return this.httpClient.post<LikeSong>(URL_API + `/like-songs/like/${s_id}/${u_id}`, s_id);
  }
  getAllLikeUser(id: number): Observable<any> {
    return this.httpClient.get<ISong[]>(URL_API + `/songs/all-like/${id}`);
  }
}
