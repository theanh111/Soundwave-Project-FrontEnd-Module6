import {Component, OnInit} from '@angular/core';
import {ISong} from '../../model/song/ISong';
import {SongService} from '../../service/song/song.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  songs: ISong[] = [];
  song: ISong;

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.getAllSong();
  }

  getAllSong() {
    this.songService.getAllSong().subscribe((data: any) => {
      this.songs = data;
    });
  }

  playThisSong(id: any) {
    this.songService.countViews(id).subscribe(() => console.log());
    this.songService.getSongById(id).subscribe(value => {
      this.song = value;
      localStorage.setItem('songSelected', JSON.stringify(this.song));
    });
    console.log('vao k');
    window.location.reload();
  }
}
