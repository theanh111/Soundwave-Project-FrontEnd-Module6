import {Component, OnInit} from '@angular/core';
import {PlayListService} from '../../service/playList/play-list.service';
import {ISong} from '../../model/song/ISong';
import {SongService} from '../../service/song/song.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {SongPlaylistService} from '../../service/songPlaylist/song-playlist.service';
import {LikeSongService} from '../../service/like/like-song.service';
import {AuthService} from '../../service/auth/auth.service';
import {UserToken} from '../../model/user-token';
import {User} from '../../model/user';
import {UserService} from '../../service/user/user.service';
import {Playlist} from '../../model/playList/playlist';
import {LikePlaylistService} from '../../service/like/like-playlist.service';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css']
})
export class PlaylistDetailsComponent implements OnInit {

  songs: ISong[] = [];
  song: ISong;
  pl_id: number;
  playlistCurrent: Playlist;
  userCurrent: UserToken;
  user: User;
  songLikes: ISong[] = [];
  playlistLikes: Playlist[] = [];

  constructor(
    private songService: SongService,
    private activatedRoute: ActivatedRoute,
    private playlistService: PlayListService,
    private songPlaylistService: SongPlaylistService,
    private likeSongService: LikeSongService,
    private authService: AuthService,
    private userService: UserService,
    private likePlaylistService: LikePlaylistService
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(value => {
      this.userCurrent = value;
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
        this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
          // @ts-ignore
          this.pl_id = param.get('id');
          this.getAllSongPlaylist(this.pl_id, this.user.id);
          this.getPlaylistCurrent(this.user.id);
        });
      });
    });

  }

  getPlaylistCurrent(userId) {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      // @ts-ignore
      this.pl_id = param.get('id');
      this.playlistService.getOnePlaylist(this.pl_id).subscribe(value => {
        this.playlistCurrent = value;
        this.likePlaylistService.getLikePlaylist(this.pl_id).subscribe(value => {
          this.playlistCurrent.isLike = false;
          this.playlistCurrent.like = value;
        });
        this.likePlaylistService.getAllLikeUser(userId).subscribe((data: any) => {
          this.playlistLikes = data;
            for (let j = 0; j < this.playlistLikes.length; j++) {
              if (this.playlistCurrent.id === this.playlistLikes[j].id) {
                this.playlistCurrent.isLike = true;
              }
            }
        });
      });
    });
  }

  likePlaylist(p_id: any) {
    this.likePlaylistService.likePlaylist(p_id, this.user.id).subscribe(() => console.log(this.user.id));
    this.getPlaylistCurrent(this.user.id);
  }

  getAllSongPlaylist(p_id: number, user_id: number) {
    this.songPlaylistService.getSongByPlaylist(p_id).subscribe((data: any) => {
      this.songs = data;
      this.songs.map(song => {
        song.isLiked = false;
        this.likeSongService.getLikeSong(song.id).subscribe(value => song.like = value);
      });
      this.likeSongService.getAllLikeUser(user_id).subscribe((data: any) => {
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

  playThisSong(id: any) {
    this.songService.countViews(id).subscribe(() => console.log('ok'));
    this.songService.getSongById(id).subscribe(value => {
      this.song = value;
      localStorage.setItem('songSelected', JSON.stringify(this.song));
      console.log(this.song);
      window.location.reload();
    });
  }

  likeSong(s_id: any) {
    this.likeSongService.likeSong(s_id, this.user.id).subscribe(() => console.log(this.user.id));
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      // @ts-ignore
      this.pl_id = param.get('id');
      this.getAllSongPlaylist(this.pl_id, this.user.id);
    });
  }
}
