// @ts-ignore
import {EventEmitter, Injectable} from '@angular/core';
// @ts-ignore
import {BehaviorSubject, Observable} from 'rxjs';
// @ts-ignore
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../Project_Sound_Wave_FrontEnd/src/environments/environment';
// @ts-ignore
import {map} from 'rxjs/operators';
import {UserToken} from '../../model/user-token';
import {User} from '../../model/user';


const API_URL = `${environment.apiUrl}`;

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  update = new EventEmitter<string>();
  private currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }

  // tslint:disable-next-line:typedef
  login(username: string, password: string) {
    return this.http.post(API_URL + '/login', {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.update.emit('login');
        return user;
      }));
  }
  // @ts-ignore
  register(user: User): Observable<any> {
    return this.http.post<User>(API_URL + '/register', user );
  }

  checkUserName(userName: string): Observable<any> {
    return this.http.get(API_URL + '/register/check');
  }

  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('user');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }
}
