import {Component, OnInit} from '@angular/core';
import {ISong} from '../../model/song/ISong';
import {SongService} from '../../service/song/song.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {LikeSongService} from '../../service/like/like-song.service';
import {UserToken} from '../../model/user-token';
import {User} from '../../model/user';
import {AuthService} from '../../service/auth/auth.service';
import {UserService} from '../../service/user/user.service';


@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.css']
})
export class DetailSongComponent implements OnInit {
  songsRecommend: ISong[];
  id: number;
  song: ISong;
  categoryId: number;
  user: User;
  songLikes: ISong[];

  constructor(
    private songService: SongService,
    private activatedRoute: ActivatedRoute,
    private likeService: LikeSongService,
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(value => {
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
      });
    });
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = +param.get('id');
      this.getSongById(this.id);
    });
  }

  playThisSong(id: any) {
    this.songService.countViews(id).subscribe();
    this.songService.getSongById(id).subscribe(value => {
      this.song = value;
      localStorage.setItem('songSelected', JSON.stringify(this.song));
      window.location.reload();
    });
  }

  getSongById(id) {
    this.songService.getSongById(this.id).subscribe(value => {
      this.song = value;
      this.categoryId = this.song.category.id;
      this.songService.getSongByCategoryId(this.categoryId).subscribe(value1 => {
        this.songsRecommend = value1;
      });
    });
  }
}
