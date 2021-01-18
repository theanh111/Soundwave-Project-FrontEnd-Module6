import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../model/user';
import {SongService} from '../../service/song/song.service';
import {ISong} from '../../model/song/ISong';
import {UserToken} from '../../model/user-token';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name: string;
  songs: ISong[] = [];
  user: User;
  currentUser: UserToken;

  constructor(
    private songService: SongService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value;
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
      });
    });
  }

  searching(event) {
    this.name = event.target.value;
    this.songService.getSongByName(this.name).subscribe(value => {
      this.songs = value;
      localStorage.setItem('historySearch', event.target.value);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
