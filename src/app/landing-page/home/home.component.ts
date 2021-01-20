import {Component, OnInit} from '@angular/core';
import {ISong} from '../../model/song/ISong';
import {SongService} from '../../service/song/song.service';
import {AuthService} from '../../service/auth/auth.service';
import {UserService} from '../../service/user/user.service';
import {User} from '../../model/user';
import {UserToken} from '../../model/user-token';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {LikeSongService} from '../../service/like/like-song.service';
import {LikeSong} from '../../model/likeSong/like-song';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  songs: ISong[] = [];
  song: ISong;
  userCurrent: UserToken;
  user: User;
  songLikes: ISong[] = [];
  constructor(
    private songService: SongService,
    private authService: AuthService,
    private userService: UserService,
    private likeService: LikeSongService,
    private fb: FormBuilder

  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(value => {
      this.userCurrent = value;
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
        console.log(this.user.id);
        this.getAllLikeSong(this.user.id);
        console.log(this.songLikes);

      });
    });
    this.getAllSong();

    console.log(this.songLikes);

  }

  getAllSong() {
    this.songService.getAllSong().subscribe((data: any) => {
      this.songs = data;
    });
  }
  getAllLikeSong(id: any) {
    this.likeService.getAllLikeUser(id).subscribe((data: any) => {
      this.songLikes = data;
    });
  }

  playThisSong(id: any) {
    this.songService.getSongById(id).subscribe(value => {
      this.song = value;
      localStorage.setItem('songSelected', JSON.stringify(this.song));
      window.location.reload();
    });
    this.songService.countViews(id).toPromise().then(r => console.log('ok'));
    console.log('vao k');
  }
  likeSong(s_id: any) {
    this.likeService.likeSong(s_id, this.user.id).subscribe(() => console.log(this.user.id));
  }

}
