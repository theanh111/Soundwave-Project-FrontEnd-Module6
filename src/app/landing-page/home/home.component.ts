import {Component, OnInit} from '@angular/core';
import {ISong} from '../../model/song/ISong';
import {SongService} from '../../service/song/song.service';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '../../service/auth/auth.service';
import {UserService} from '../../service/user/user.service';
import {LikeSongService} from '../../service/like/like-song.service';
import {FormBuilder} from '@angular/forms';
import {UserToken} from '../../model/user-token';
import {User} from '../../model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  historySong: BehaviorSubject<number> = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('historySongs')));
  songs: ISong[] = [];
  song: ISong;
  array: [];
  historySongs: ISong[] = [];
  userCurrent: UserToken;
  user: User;
  songLikes: ISong[] = [];

  constructor(
    private songService: SongService,
    private authService: AuthService,
    private userService: UserService,
    private likeService: LikeSongService
  ) {
  }

  ngOnInit(): void {
    if (this.userCurrent == null) {
      this.songService.getAllNewSong().subscribe(value => {
        this.songs = value;
      });
    }
    this.getHistorySongs();
    this.authService.currentUser.subscribe(value => {
      this.userCurrent = value;
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
        this.getAllSong(this.user.id);
      });
    });
  }

  getAllSong(userId: any) {
    this.songService.getAllNewSong().subscribe((data: any) => {
      this.songs = data;
      this.songs.map(song => {
        song.isLiked = false;
        this.likeService.getLikeSong(song.id).subscribe(value => song.like = value);
      });
      // tslint:disable-next-line:no-shadowed-variable
      this.likeService.getAllLikeUser(userId).subscribe((data: any) => {
        this.songLikes = data;
        for (let i = 0; i < this.songs.length; i++) {
          for (let j = 0; j < this.songLikes.length; j++) {
            if (this.songs[i].id === this.songLikes[j].id) {
              this.songs[i].isLiked = true;
            }
          }
        }
      });
    });
  }

  getHistorySongs() {
    this.songService.getSong(this.historySong.value).subscribe(value => {
      this.historySongs[0] = value;
    });
  }

  playThisSong(id: any) {
    this.songService.countViews(id).subscribe(() => console.log());
    this.songService.getSongById(id).subscribe(value => {
      this.song = value;
      localStorage.setItem('songSelected', JSON.stringify(this.song));
      let array = [];
      array[0] = this.song.id;
      localStorage.setItem('historySongs', JSON.stringify(array));
      window.location.reload();
    });
  }

  likeSong(s_id: any) {
    this.likeService.likeSong(s_id, this.user.id).subscribe(() => console.log(this.user.id));
    this.getAllSong(this.user.id);
  }
}
