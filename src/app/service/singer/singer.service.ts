import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISinger} from '../../model/singer/ISinger';
import {environment} from "../../../environments/environment";

const urlApi = `${environment.apiUrl}`;
// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class SingerService {

  constructor(private httpClient: HttpClient) { }

  getAllSinger(): Observable<any> {
    return this.httpClient.get<ISinger[]>(urlApi + '/singers');
  }
  getOneSinger(id: number): Observable<any> {
    return this.httpClient.get<ISinger>(urlApi + '/singers' + `/${id}`);
  }
}
