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
import {PlayList} from '../../../model/playList/play-list';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ICategory} from '../../../model/category/ICategory';
import {CategoryService} from '../../../service/category/category.service';


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
  categories: ICategory[] = [];
  songLikes: ISong[] = [];
  closeResult: string;
  playList: PlayList;
  playLists: PlayList[] = [];
  playForm: FormGroup = this.fb.group({
    name: new FormControl(),
    category: new FormControl(),
    description: new FormControl()
  })

  constructor(
    private songService: SongService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private likeService: LikeSongService,
    private modalService: NgbModal,
    private playListService: PlayListService,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    const userFromLocalStorage = this.authService.currentUserValue;
    this.userService.getUserByUsername(userFromLocalStorage.username).subscribe(value => {
      this.user = value;
      this.getMySongs(this.user.id);
    });
    this.getAllCategory();
    this.getAllPlaylist();
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

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }
  async setNewPlayList() {
    const category: ICategory = await this.getCategory();
    const playList: PlayList = {
      name: this.playForm.get('name').value,
      description: this.playForm.get('description').value,
      user: this.user
    }
    if (category != null) {
      playList.category = category;
    }
    return playList;
  }
  async savePlayList() {
    const newPlay: PlayList = await this.setNewPlayList();
    this.playListService.savePlayList(newPlay).subscribe(() => {
      alert("Save new playlist successfully");
    })
  }
  // @ts-ignore
  getAllCategory(): ICategory[] {
    this.categoryService.getAllCategory().subscribe(value => this.categories = value);
  }

  getCategory() {
    // tslint:disable-next-line:variable-name
    const category_id = +this.playForm.get('category')?.value;
    return  this.categoryService.getCategory(category_id).toPromise();
  }
  getAllPlaylist() {
    this.playListService.getAllPlaylist().subscribe(value => {
      this.playLists = value;
    })
  }
}
