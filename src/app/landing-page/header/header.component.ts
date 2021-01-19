import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../model/user';
import {SongService} from '../../service/song/song.service';
import {ISong} from '../../model/song/ISong';
import {UserToken} from '../../model/user-token';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

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
  searchForm: FormGroup = this.fb.group({
    name: new FormControl()
  });

  constructor(
    private songService: SongService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value;
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
      });
    });
  }

  searchSong() {
    let name: string = this.searchForm.value.name;
    this.router.navigate([`/songs/search/${name}`]);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
