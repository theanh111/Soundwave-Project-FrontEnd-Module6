import {Component, OnInit} from '@angular/core';
import {ISong} from '../../model/song/ISong';
import {BehaviorSubject} from 'rxjs';
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
  }
}
