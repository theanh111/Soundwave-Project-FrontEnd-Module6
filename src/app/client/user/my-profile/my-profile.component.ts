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
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PlayListService} from '../../../service/playList/play-list.service';
import {Playlist} from '../../../model/playList/playlist';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ICategory} from '../../../model/category/ICategory';
import {CategoryService} from '../../../service/category/category.service';
import {SongPlaylistService} from '../../../service/songPlaylist/song-playlist.service';

import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

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
  playlists: Playlist[] = [];
  categories: ICategory[] = [];
  songLikes: ISong[] = [];
  closeResult: string;
  playList: Playlist;
  myPlayLists: Playlist[] = [];
  arraySong: ISong[] = [];
  songsNotInPlaylist: ISong[] = [];
  addSong: boolean = false;
  subSong: ISong;
  playForm: FormGroup = this.fb.group({
    name: new FormControl(),
    category: new FormControl(),
    description: new FormControl()
  });
  songPlaylistForm: FormGroup = this.fb.group({
    song: new FormControl(),
    playlist: new FormControl()
  });
  playUpForm: FormGroup;

  constructor(
    private songService: SongService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private likeService: LikeSongService,
    private modalService: NgbModal,
    private playListService: PlayListService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private songPlaylistService: SongPlaylistService
  ) {

  }

  ngOnInit(): void {
    this.playUpForm = this.fb.group({
        name: [null],
        category: [null],
        description: [null]
      });
    const userFromLocalStorage = this.authService.currentUserValue;
    this.userService.getUserByUsername(userFromLocalStorage.username).subscribe(value => {
      this.user = value;
      this.getMySongs(this.user.id);
      this.getMyPlaylists(this.user.id);
    });
    this.getAllCategory();
    this.getAllPlaylist();
  }

  // @ts-ignore
  getMySongs(id: number): ISong[] {
    this.songService.getUserSong(id).subscribe(value => {
      this.songs = value;
      this.songs = value;
      this.songs.map(song => song.isLiked = false);
      this.likeService.getAllLikeUser(id).subscribe((data: any) => {
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
      this.getMySongs(this.user.id);
    }
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, {scrollable: true});
  }

  async setNewPlayList() {
    const category_id = +this.playForm.get('category')?.value;
    const category: ICategory = await this.getCategory(category_id);
    const playList: Playlist = {
      name: this.playForm.get('name').value,
      description: this.playForm.get('description').value,
      user: this.user
    };
    if (category != null) {
      playList.category = category;
    }
    return playList;
  }

  async savePlayList() {
    const newPlay: Playlist = await this.setNewPlayList();
    this.playListService.savePlayList(newPlay).subscribe(() => {
      alert("Save new playlist successfully");
      this.getMyPlaylists(this.user.id);
      this.getMySongs(this.user.id);
    });
  }

  // @ts-ignore
  getAllCategory(): ICategory[] {
    this.categoryService.getAllCategory().subscribe(value => this.categories = value);
  }

  getCategory(id: any) {
    return this.categoryService.getCategory(id).toPromise();
  }

  getAllPlaylist() {
    this.playListService.getAllPlaylist().subscribe(value => {
      this.myPlayLists = value;
    });
  }

   getSongAddToList(id) {
    return this.songService.getSongById(id).toPromise();
  }

  checkSongPlaylist(id, song: ISong) {
    return this.songPlaylistService.checkSongPlaylist(id, song).toPromise();
  }
  getOnePlaylist(id: any) {
    return this.playListService.getOnePlaylist(id).toPromise()
  }
  async setNewPlaylistUp() {
    const category_id = +this.playUpForm.value.category;
    const category: ICategory = await this.getCategory(category_id);
    const playList: Playlist = {
      name: this.playUpForm.value.name,
      description: this.playUpForm.value.description,
      user: this.user
    };
    if (category != null) {
      playList.category = category;
    }
    return playList;
  }
  async updateMyPlaylist(p_id: any) {
    const playlist: Playlist = await this.setNewPlaylistUp();
    this.playListService.updateMyPlaylist(p_id, this.user.id , playlist).subscribe(()=>{
      alert("update successful");
      this.getMyPlaylists(this.user.id);
    });
  }

  async addSongToPlaylist(id: number) {
    const newSong: ISong = await this.getSongAddToList(id);
    let p_id = +this.songPlaylistForm.get('playlist').value;
    let checkSong: boolean = await this.checkSongPlaylist(p_id, newSong);
    if (checkSong) {
      this.songPlaylistService.addSongToPlaylist(p_id, newSong).subscribe(() => alert('add to playlist ok!'));
    } else {
      alert('this song had in this playlist');
    }
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.playlists.filter(v => v.name.toLowerCase()
          .indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  formatter = (x: { name: string, id: number }) => {
    x.name, x.id;
  }
  getMyPlaylists(id) {
    this.playListService.getMyPlaylists(id).subscribe(value => this.myPlayLists = value);
  }
  getAllSongNotInPlaylist(id: number) {
    this.songService.getSongNotInPlaylist(id).subscribe(value => {
      this.songsNotInPlaylist = value
      this.songsNotInPlaylist.map(song => {
        song.isLiked = false;
      })
      for (let i = 0; i < this.arraySong.length; i++) {
        for (let j = 0; j < this.songsNotInPlaylist.length; j++) {
          if (this.arraySong[i].id == this.songsNotInPlaylist[j].id) {
            this.songsNotInPlaylist[j].isLiked = true;
          }
        }
      }
    });
  }
  subSongFromArrayAdd(p_id: any, s_id: any) {
    this.songService.getSong(s_id).subscribe( value => {
      this.subSong = value;
      for (let i = 0; i < this.arraySong.length; i++) {
        if (this.subSong.id == this.arraySong[i].id) {
          this.arraySong.splice(i,1);
          this.getAllSongNotInPlaylist(p_id);
        }
      }
    })
  }
  addSongToArrayBFAdd(p_id: number, s_id: any) {
    this.songService.getSong(s_id).subscribe( value => {
      this.arraySong.push(value);
      this.getAllSongNotInPlaylist(p_id);
    })
  }
  addArraySongToPlaylist(p_id: any) {
    for (let i = 0; i < this.arraySong.length; i++) {
      this.songPlaylistService.addSongToPlaylist(p_id, this.arraySong[i]).subscribe(() => console.log());
    }
    alert("add to playlist success");
  }
}
