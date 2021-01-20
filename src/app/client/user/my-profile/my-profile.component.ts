import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UserToken} from '../../../model/user-token';
import {AuthService} from '../../../service/auth/auth.service';
import {UserService} from '../../../service/user/user.service';
import {User} from '../../../model/user';
import {SongService} from '../../../service/song/song.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ISong} from '../../../model/song/ISong';
import {LikeSongService} from '../../../service/like/like-song.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  songs: ISong[] = [];
  song: ISong;
  user: User;
  id: number;
  songLikes: ISong[] = [];

  constructor(
    private songService: SongService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private likeService: LikeSongService
  ) {
  }

  ngOnInit(): void {
    const userFromLocalStorage = this.authService.currentUserValue;
    this.userService.getUserByUsername(userFromLocalStorage.username).subscribe(value => {
      this.user = value;
      // @ts-ignore
      this.getMySongs(this.user.id);
    });
  }

  // @ts-ignore
  getMySongs(id: number): ISong[] {
    this.songService.getUserSong(id).subscribe(value =>  {
      this.songs = value;
      this.songs = value;
      this.songs.map(song => song.isLiked = false);
      this.likeService.getAllLikeUser(id).subscribe((data: any) => {
        this.songLikes = data;
        for (let i = 0; i < this.songs.length; i++) {
          for (let j = 0; j < this.songLikes.length; j++) {
            if (this.songs[i].id == this.songLikes[j].id) {
              this.songs[i].isLiked = true;
            }
          }
        }
        console.log(this.songLikes);
      });
    });
  }

  likeSong(s_id: any) {
    this.likeService.likeSong(s_id, this.user.id).subscribe(() => console.log(this.user.id));
    this.getMySongs(this.user.id);
    // this.getAllLikeSong(this.user.id);
  }

  playThisSong(id: any) {
    this.songService.countViews(id).subscribe(() => console.log());
    this.songService.getSongById(id).subscribe(value => {
      this.song = value;
      localStorage.setItem('songSelected', JSON.stringify(this.song));
      window.location.reload();
    });
  }

  deleteSong(id: any) {
    if (confirm('Are you sure')) {
      this.songService.deleteSong(id).subscribe(() => console.log('ok'));
      window.location.reload();
    }
  }
}
