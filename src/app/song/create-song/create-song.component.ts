import {Component, OnInit} from '@angular/core';
import {UserToken} from '../../model/user-token';
import {User} from '../../model/user';
import {Observable} from 'rxjs';
import {ISinger} from '../../model/singer/ISinger';
import {ICategory} from '../../model/category/ICategory';
import {IAlbum} from '../../model/album/IAlbum';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {UserService} from '../../service/user/user.service';
import {SongService} from '../../service/song/song.service';
import {SingerService} from '../../service/singer/singer.service';
import {CategoryService} from '../../service/category/category.service';
import {AlbumService} from '../../service/album/album.service';
import {finalize} from 'rxjs/operators';
import {ISong} from '../../model/song/ISong';

// @ts-ignore
@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent implements OnInit {
  name = '';
  description = '';
  urlMp3 = '';
  avatar = '';
  musician = '';
  views = 200;
  userCurrent: UserToken;
  user: User;
  title = 'cloudsSorage';
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  singers: ISinger[] = [];
  categories: ICategory[] = [];
  albums: IAlbum[] = [];
  failMessage = '';

  constructor(
    private storage: AngularFireStorage,
    private fbd: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private songService: SongService,
    private singerService: SingerService,
    private categoryService: CategoryService,
    private albumService: AlbumService
  ) {
    this.getAllSinger();
    this.getAllCategory();
    this.getAllAlbum();
  }
  songForm: FormGroup = this.fbd.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(),
    musician: new FormControl('', Validators.required),
    singer: new FormControl('', Validators.required),
    category:  new FormControl('', Validators.required),
    album: new FormControl(),
    urlMp3: new FormControl('', Validators.required),
    urlAvatar: new FormControl('', Validators.required)
  });

  ngOnInit() {}

  saveUrlMp3(event) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe( finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.urlMp3 = url;
            }
            console.log(this.fb);
          });
        })
      ).subscribe(url => {
      if (url) {
        console.log(url);
      }
    });
  }

  loadFile(event) {
    const output = (document.getElementById('output') as HTMLImageElement);
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = () => {
      URL.revokeObjectURL(output.src);
    };
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.avatar = url;
            }
            console.log(this.fb);
          });
        })
      ).subscribe(url => {
      if (url) {
        console.log(url);
      }
    });
  }

  saveAvatar(event) {
    const output = (document.getElementById('imagePreview') as HTMLImageElement);
    output.src = URL.createObjectURL(event.target.files[0]);
    console.log(output.src);
    output.onload = () => {
      URL.revokeObjectURL(output.src);
    };
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe( finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.avatar = url;
              console.log(this.avatar);
            }
            console.log(this.fb);
          });
        })
      ).subscribe(url => {
      if (url) {
        console.log(url);
      }
    });
  }

  async setNewSong() {
    const user: User = await this.getUserFromDB();
    const singer: ISinger = await this.getSinger();
    const category: ICategory = await this.getCategory();
    const album: IAlbum = await  this.getOneAlbum();
    const song: ISong = {
      name: this.songForm.get('name')?.value,
      description: this.songForm.get('description')?.value,
      urlMp3: this.urlMp3,
      avatar: this.avatar,
      musician: this.songForm.get('musician')?.value,
      views: this.songForm.get('views')?.value,
    };
    if (user != null){
      song.user = user;
    }
    if (singer != null){
      song.singer = singer;
    }
    if (category != null){
      song.category = category;
    }
    if (album != null){
      song.album = album;
    }
    return song;
  }

  async save() {
    const newS: ISong = await this.setNewSong();
    console.log(newS);
    this.songService.createSong(newS).subscribe(() => {
      alert('Create Successfully!');
      this.router.navigate(['/profile']);
    }, error => {
      alert('Error!');
    });
  }
  async getUserFromDB() {
    const userFromLocalStorage = this.authService.currentUserValue;
    return this.userService.getUserByUsername(userFromLocalStorage.username).toPromise();
  }

  // @ts-ignore
  getAllSinger(): ISinger[] {
    this.singerService.getAllSinger().subscribe(value => {
      this.singers = value;
    });
  }
  getSinger() {
    // tslint:disable-next-line:variable-name
    const singer_id = +this.songForm.get('singer')?.value;
    return  this.singerService.getOneSinger(singer_id).toPromise();
  }

  // @ts-ignore
  getAllCategory(): ICategory[] {
    this.categoryService.getAllCategory().subscribe(value => this.categories = value);
  }

  getCategory() {
    // tslint:disable-next-line:variable-name
    const category_id = +this.songForm.get('category')?.value;
    return  this.categoryService.getCategory(category_id).toPromise();
  }

  // @ts-ignore
  getAllAlbum(): IAlbum[] {
    this.albumService.getAllAlbum().subscribe(value => this.albums = value);
  }

  getOneAlbum(): IAlbum {
    // tslint:disable-next-line:variable-name
    const album_id = +this.songForm.get('album')?.value;
    // @ts-ignore
    return this.albumService.getOneAlbum(album_id).toPromise();
  }
}
