import {Component, OnInit} from '@angular/core';
import {ISong} from '../../model/song/ISong';
import {SongService} from '../../service/song/song.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  historySong: BehaviorSubject<number> = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('historySongs')));
  songs: ISong[] = [];
  song: ISong;
  array: [];
  historySongs: ISong[] = [];

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.getAllSong();
    this.getHistorySongs();
  }

  getAllSong() {
    this.songService.getAllSong().subscribe((data: any) => {
      this.songs = data;
    });
  }

  getHistorySongs() {
    this.songService.getSong(this.historySong.value).subscribe(value => {
      console.log(value);
      this.historySongs[0] = value;
    });
  }

  playThisSong(id: any) {
    this.songService.countViews(id).subscribe(() => console.log());
    this.songService.getSongById(id).subscribe(value => {
      this.song = value;
      // if (this.historySongs.length >= 5) {
      //   this.historySongs.shift();
      // this.historySongs.push(this.song.id);
      // } else {

      localStorage.setItem('songSelected', JSON.stringify(this.song));
      let array = [];
      array[0] = this.song.id;
      localStorage.setItem('historySongs', JSON.stringify(array));
      window.location.reload();
    });


  }
}
