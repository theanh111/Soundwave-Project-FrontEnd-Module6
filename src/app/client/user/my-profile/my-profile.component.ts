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
import {ISinger} from '../../../model/singer/ISinger';
import {SingerService} from '../../../service/singer/singer.service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


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
  closeResult: string;
  singers: ISinger[] = [];
  public model: any;


  constructor(
    private songService: SongService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private likeService: LikeSongService,
    private modalService: NgbModal,
    private singerService: SingerService
  ) {
  }

  ngOnInit(): void {
    this.getAllSinger();
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

  // tslint:disable-next-line:variable-name
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

  // @ts-ignore
  getAllSinger(): ISinger[] {
    this.singerService.getAllSinger().subscribe(value => {
      this.singers = value;
    });
  }


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.singers.filter(v => v.name.toLowerCase()
          .indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  formatter = (x: {name: string}) => x.name;
}
