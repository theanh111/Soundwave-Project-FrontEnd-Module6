import {Component, OnInit} from '@angular/core';
import {ISong} from '../../model/song/ISong';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  songCurrentObject: BehaviorSubject<ISong> = new BehaviorSubject<ISong>(JSON.parse(localStorage.getItem('songSelected')));
  song: ISong;
  constructor(
  ) {
  }

  ngOnInit(): void {
    if (this.songCurrentObject.value !== null) {
      this.song = this.songCurrentObject.value;
    }
  }

}