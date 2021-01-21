import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ISong} from '../../model/song/ISong';
import {UserToken} from '../../model/user-token';
import {User} from '../../model/user';
import {SongService} from '../../service/song/song.service';
import {AuthService} from '../../service/auth/auth.service';
import {UserService} from '../../service/user/user.service';
import {LikeSongService} from '../../service/like/like-song.service';

@Component({
  selector: 'app-playing-songs',
  templateUrl: './playing-songs.component.html',
  styleUrls: ['./playing-songs.component.css']
})
export class PlayingSongsComponent implements OnInit {
  // historySong: BehaviorSubject<number> = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('historySongs')));
  list = JSON.parse(localStorage.getItem('Storage'));
  song: ISong;
  historySongs: ISong[] = [];
  userCurrent: UserToken;
  user: User;

  constructor(
    private songService: SongService,
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getHistorySongs();
    this.authService.currentUser.subscribe(value => {
      this.userCurrent = value;
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
      });
    });
  }

  getHistorySongs() {
    for (let i = 0; i < this.list.length; i++) {
      this.songService.getSongById(Number(this.list[i])).subscribe(value => {
        this.historySongs.push(value);
      });
    }
  }
}
