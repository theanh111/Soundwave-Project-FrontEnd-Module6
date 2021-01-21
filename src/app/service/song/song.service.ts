import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISong} from '../../model/song/ISong';
import {environment} from "../../../environments/environment";

const URL_API = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private httpClient: HttpClient) {
  }

  getAllSong(): Observable<ISong[]> {
    return this.httpClient.get<any>(URL_API + '/songs');
  }

  getAllNewSong(): Observable<ISong[]> {
    return this.httpClient.get<any>(URL_API + '/songs/date-new');
  }

  createSong(song: ISong): Observable<any> {
    return this.httpClient.post<ISong>(URL_API + `/songs`, song);
  }

  getSongById(id: number): Observable<any> {
    return this.httpClient.post(URL_API + `/songs/getsong`, id);
  }

  getUserSong(id: number): Observable<any> {
    return this.httpClient.post<ISong[]>(URL_API + `/songs/my-songs`, id);
  }

  updateSong(song: ISong): Observable<any> {
    return this.httpClient.put<ISong>(URL_API + `/songs/${song.id}`, song);
  }

  getSong(id: number): Observable<any> {
    return this.httpClient.get<ISong>(URL_API + `/songs/${id}`);
  }

  countViews(id: number): Observable<any> {
    return this.httpClient.post<ISong>(URL_API + `/songs/count-views`, id);
  }

  deleteSong(id: number): Observable<any> {
    return this.httpClient.delete(URL_API + `/songs/${id}`);
  }

  searchSong(name: string): Observable<any> {
    return this.httpClient.post(URL_API + `/songs/search/${name}`, name);
  }

  // getSongByCategoryId(id: number): Observable<any> {
  //   return this.httpClient.get(URL_API + `/songs/detail/${id}`);
  // }

  getSongByCategoryId(id: number): Observable<any> {
    return this.httpClient.get(URL_API + `/songs/category/${id}`);
  }
}
