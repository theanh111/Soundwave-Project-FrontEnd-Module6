import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {User} from '../../model/user';
import {environment} from "../../../environments/environment";


const API_URL = `${environment.apiUrl}`;

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
  }

  resetPassword(username: string, password: string): Observable<any> {
    return this.http.put(API_URL + `/users/resetpassword/${username}`, password);
  }

  getUserByUsername(username: any): Observable<any> {
    return this.http.get<User>(API_URL + `/users/${username}`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(API_URL + `/users/update`, user);
  }

  checkPassword(user: User): Observable<any> {
    return this.http.post(API_URL + `/users/resetpassword`, user);
  }
}
