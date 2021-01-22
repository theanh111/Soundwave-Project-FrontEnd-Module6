import {Component, OnInit} from '@angular/core';
import {ISong} from '../../model/song/ISong';
import {SongService} from '../../service/song/song.service';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '../../service/auth/auth.service';
import {UserService} from '../../service/user/user.service';
import {LikeSongService} from '../../service/like/like-song.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserToken} from '../../model/user-token';
import {User} from '../../model/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from '../../service/category/category.service';
import {SongPlaylistService} from '../../service/songPlaylist/song-playlist.service';
import {PlayListService} from '../../service/playList/play-list.service';
import {Playlist} from '../../model/playList/playlist';
import {LikePlaylistService} from '../../service/like/like-playlist.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  historySong: BehaviorSubject<number> = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('historySongs')));
  songs: ISong[] = [];
  topSongs: ISong[] = [];
  song: ISong;
  array: [];
  historySongs: ISong[];
  testString: string;
  userCurrent: UserToken;
  user: User;
  myPlayLists: Playlist[] = [];
  songLikes: ISong[] = [];
  playlistLikes: Playlist[] = [];
  playList: Playlist;
  playLists: Playlist[] = [];
  allPlayLists: Playlist[] = [];
  playlistsNewest: Playlist[] = [];
  songPlaylistForm: FormGroup = this.fb.group({
    song: new FormControl(),
    playlist: new FormControl()
  });

  constructor(
    private songService: SongService,
    private authService: AuthService,
    private userService: UserService,
    private likeService: LikeSongService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private categoryService: CategoryService,
    private songPlaylistService: SongPlaylistService,
    private playListService: PlayListService,
    private likePlaylistService: LikePlaylistService
  ) {
  }

  ngOnInit(): void {
    if (this.userCurrent == null) {
      this.songService.getAllNewSong().subscribe(value => {
        this.songs = value;
      });
    }
    if (this.userCurrent == null) {
      this.songService.getTopViewSong().subscribe(value => {
        this.topSongs = value;
      });
    }
    this.getHistorySongs();
    this.authService.currentUser.subscribe(value => {
      this.userCurrent = value;
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
        this.getAllSong(this.user.id);
        this.getTopSong(this.user.id);
        this.getMyPlaylists(this.user.id);
        this.getAllPlaylistNewest(this.user.id);
        // console.log(this.songLikes);

      });
    });
    this.getAllPlaylist();

    // console.log(this.songs);
    // console.log(this.playlistsNewest);
  }

  getAllSong(userId: any) {
    this.songService.getAllNewSong().subscribe((data: any) => {
      this.songs = data;
      this.songs.map(song => {
        song.isLiked = false;
        this.likeService.getLikeSong(song.id).subscribe(value => song.like = value);
      });
      this.likeService.getAllLikeUser(userId).subscribe((data: any) => {
        this.songLikes = data;
        for (let i = 0; i < this.songs.length; i++) {
          for (let j = 0; j < this.songLikes.length; j++) {
            if (this.songs[i].id === this.songLikes[j].id) {
              this.songs[i].isLiked = true;
            }
          }
        }
        console.log(this.songLikes);
      });
    });
  }

  getTopSong(userId: any) {
    this.songService.getTopViewSong().subscribe((data: any) => {
      this.topSongs = data;
      this.topSongs.map(song => {
        song.isLiked = false;
        this.likeService.getLikeSong(song.id).subscribe(value => song.like = value);
      });
      this.likeService.getAllLikeUser(userId).subscribe((data: any) => {
        this.songLikes = data;
        for (let i = 0; i < this.topSongs.length; i++) {
          for (let j = 0; j < this.songLikes.length; j++) {
            if (this.topSongs[i].id === this.songLikes[j].id) {
              this.topSongs[i].isLiked = true;
            }
          }
        }
        console.log(this.songLikes);
      });
    });
  }
  getHistorySongs() {
    this.songService.getSong(Number(this.historySong.value)).subscribe(value => {
      this.historySongs = value;
    });
  }

  playThisSong(id: any) {
    this.songService.countViews(id).subscribe(() => console.log());
    this.songService.getSongById(id).subscribe(value => {
      this.song = value;
      localStorage.setItem('songSelected', JSON.stringify(this.song));
      this.testString = String(this.song.id);
      if (localStorage.getItem('Storage') == null) {
        let Values = [];
        Values.push(this.testString);
        localStorage.setItem('Storage', JSON.stringify(Values));
      } else {
        let array = JSON.parse(localStorage.getItem('Storage'));
        if (array.length === 5) {
          array.shift();
          localStorage.setItem('Storage', JSON.stringify(array));
        }
        let Values = [];
        Values = JSON.parse(localStorage.getItem('Storage'));
        Values.push(this.testString);
        localStorage.setItem('Storage', JSON.stringify(Values));
      }
      window.location.reload();
    });
  }

  likeSong(s_id: any) {
    this.likeService.likeSong(s_id, this.user.id).subscribe(() => console.log(this.user.id));
    this.getAllSong(this.user.id);
    this.getTopSong(this.user.id);
    // this.getAllLikeSong(this.user.id);
  }
  openScrollableContent(longContent) {
    this.modalService.open(longContent, {scrollable: true});
  }
  getSongAddToList(id) {
    return this.songService.getSongById(id).toPromise();
  }
  checkSongPlaylist(id, song: ISong) {
    return this.songPlaylistService.checkSongPlaylist(id, song).toPromise();
  }
  async addSongToPlaylist(id: number) {
    const newSong: ISong = await this.getSongAddToList(id);
    let p_id = +this.songPlaylistForm.get('playlist').value;
    let checkSong: boolean = await this.checkSongPlaylist(p_id, newSong);
    if (checkSong) {
      this.songPlaylistService.addSongToPlaylist(p_id, newSong).subscribe(() => alert('add to playlist ok!'));
    }
    else {
      alert('this song had in this playlist');
    }
  }
  getAllPlaylist() {
    this.playListService.getAllPlaylist().subscribe(value => {
      this.playLists = value;
    });
  }
  getAllPlaylistNewest(userId: any) {
    this.playListService.getAllPlaylist().subscribe((data: any) => {
      this.playlistsNewest = data;
      this.playlistsNewest.map(async playlist => {
        playlist.isLike = false;
        playlist.song = await this.getSongByPlaylist(playlist.id);
        this.likePlaylistService.getLikePlaylist(playlist.id).subscribe(value => {
          playlist.like = value;
        });
      });
      this.likePlaylistService.getAllLikeUser(userId).subscribe((data: any) => {
        this.playlistLikes = data;
        for (let i = 0; i < this.playlistsNewest.length; i++) {
          for (let j = 0; j < this.playlistLikes.length; j++) {
            if (this.playlistsNewest[i].id === this.playlistLikes[j].id) {
              this.playlistsNewest[i].isLike = true;
            }
          }
        }
      });
    });
  }
  getSongByPlaylist(id: number) {
    return this.songPlaylistService.getSongByPlaylist(id).toPromise();
  }
  getMyPlaylists(id) {
    this.playListService.getMyPlaylists(id).subscribe(value => this.myPlayLists = value);
  }
  likePlaylist(p_id: any) {
    this.likePlaylistService.likePlaylist(p_id, this.user.id).subscribe(() => console.log(this.user.id));
    this.getAllSong(this.user.id);
    this.getTopSong(this.user.id);
    this.getAllPlaylistNewest(this.user.id);
  }

}
