import {Component, OnInit} from '@angular/core';
import {ISong} from '../../model/song/ISong';
import {BehaviorSubject, Observable} from 'rxjs';
import {SongService} from '../../service/song/song.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  // songCurrentObject: BehaviorSubject<number> = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('songSelected')));
  songCurrentObject: BehaviorSubject<ISong> = new BehaviorSubject<ISong>(JSON.parse(localStorage.getItem('songSelected')));
  song: ISong;
  id: number;
  allId: number;
  allSong: ISong[];
  idNext: number;
  i: number;
  constructor(
    private songService: SongService
  ) {
  }

  ngOnInit(): void {
    // if (this.songCurrentObject.value !== null) {
    //   this.songService.getSongById(this.songCurrentObject.value).subscribe(value => {
    //     this.song = value;
    //   });
    // }
    this.songService.getAllSong().subscribe(value => this.allId = value.length);
    this.songService.getAllSong().subscribe(value => this.allSong = value);
    if (this.songCurrentObject.value !== null) {
      this.song = this.songCurrentObject.value;
    }
  }

  nextSong() {
    for (let j = 0; j < this.allSong.length; j++) {
      if (this.songCurrentObject.value.id === this.allSong[j].id) {
        this.song = this.allSong[j + 1];
        console.log(this.song);
      }
      if (this.songCurrentObject.value.id === this.allSong[this.allSong.length - 1].id) {
        this.song = this.allSong[0];
        console.log(this.song);
      }
    }
    localStorage.setItem('songSelected', JSON.stringify(this.song));
    window.location.reload();
  }

  backSong() {
    for (let j = 0; j < this.allSong.length; j++) {
      if (this.songCurrentObject.value.id === this.allSong[j].id) {
        this.song = this.allSong[j - 1];
        console.log(this.song);
      }
      if (this.songCurrentObject.value.id === this.allSong[0].id) {
        this.song = this.allSong[this.allSong.length - 1];
        console.log(this.song);
      }
    }
    localStorage.setItem('songSelected', JSON.stringify(this.song));
    window.location.reload();
  }
}
