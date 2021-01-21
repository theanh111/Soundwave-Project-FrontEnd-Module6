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
  idNext: number;
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
    if (this.songCurrentObject.value !== null) {
      this.song = this.songCurrentObject.value;
    }
    this.songService.getAllSong().subscribe(value => this.allId = value.length);
  }

  nextSong() {
    if (this.allId === this.songCurrentObject.value.id ){
      this.idNext = 1;
    }else {
      this.idNext = this.songCurrentObject.value.id + 1;
    }
    this.songService.getSong(this.idNext).subscribe(value => {
      this.song = value;
      localStorage.setItem('songSelected', JSON.stringify(this.song));
      window.location.reload();
    });
  }
  backSong() {
    if (1 === this.songCurrentObject.value.id ){
      this.idNext = this.allId;
    }else {
      this.idNext = this.songCurrentObject.value.id - 1;
    }
    this.songService.getSong(this.idNext).subscribe(value => {
      this.song = value;
      localStorage.setItem('songSelected', JSON.stringify(this.song));
      window.location.reload();
    });
  }
}
