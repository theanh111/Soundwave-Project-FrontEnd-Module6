import { Component, OnInit } from '@angular/core';
import {ISong} from '../../model/song/ISong';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {SongService} from '../../service/song/song.service';

@Component({
  selector: 'app-songs-by-categoryname',
  templateUrl: './songs-by-categoryname.component.html',
  styleUrls: ['./songs-by-categoryname.component.css']
})
export class SongsByCategorynameComponent implements OnInit {
  song: ISong;
  categoryName: string;
  songsByCategoryName: ISong[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private songService: SongService
  ) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.categoryName = param.get('name');
      this.getAllSongByCategoryName(this.categoryName);
    });
  }
  getAllSongByCategoryName(name) {
    this.songService.getSongByCategoryName(name).subscribe(value => {
      this.songsByCategoryName = value;
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
