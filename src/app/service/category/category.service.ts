import { Injectable } from '@angular/core';
import {environment} from '../../../../../Project_Sound_Wave_FrontEnd/src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICategory} from '../../../../../Project_Sound_Wave_FrontEnd/src/app/model/category/ICategory';

const urlApi = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getAllCategory(): Observable<any> {
    return this.httpClient.get<ICategory[]>(urlApi + '/categories');
  }
  getCategory(id: number): Observable<any> {
    return this.httpClient.get<ICategory>(urlApi + '/categories' + `/${id}`);
  }
 }
