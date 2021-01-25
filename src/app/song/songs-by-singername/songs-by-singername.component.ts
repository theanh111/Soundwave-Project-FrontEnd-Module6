import { Component, OnInit } from '@angular/core';
import {ISong} from '../../model/song/ISong';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {SongService} from '../../service/song/song.service';

@Component({
  selector: 'app-songs-by-singername',
  templateUrl: './songs-by-singername.component.html',
  styleUrls: ['./songs-by-singername.component.css']
})
export class SongsBySingernameComponent implements OnInit {

  song: ISong;
  singerName: string;
  songsBySingerName: ISong[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private songService: SongService
  ) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.singerName = param.get('name');
      this.getAllSongBySingerName(this.singerName);
    });
  }
  getAllSongBySingerName(name) {
    this.songService.getSongBySingerName(name).subscribe(value => {
      this.songsBySingerName = value;
    });
  }
  playThisSong(id: any) {
    this.songService.countViews(id).subscribe(() => console.log('ok'));
    this.songService.getSongById(id).subscribe(value => {
      this.song = value;
      localStorage.setItem('songSelected', JSON.stringify(this.song));
      console.log(this.song);
      window.location.reload();
    });
  }
}
