import { Injectable } from '@angular/core';
import {environment} from '../../../../../Project_Sound_Wave_FrontEnd/src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICategory} from '../../../../../Project_Sound_Wave_FrontEnd/src/app/model/category/ICategory';
import {IAlbum} from '../../../../../Project_Sound_Wave_FrontEnd/src/app/model/album/IAlbum';
const urlApi = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private httpClient: HttpClient) { }
  getAllAlbum(): Observable<any> {
    return  this.httpClient.get<ICategory[]>(urlApi + '/albums');
  }
  getOneAlbum(id: number): Observable<any> {
    return this.httpClient.get<IAlbum>(urlApi + '/albums' + `/${id}`);
  }
}
