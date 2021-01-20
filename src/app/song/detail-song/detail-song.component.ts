import {Component, OnInit} from '@angular/core';
import {ISong} from '../../model/song/ISong';
import {SongService} from '../../service/song/song.service';
import {ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.css']
})
export class DetailSongComponent implements OnInit {
  songsRecommend: ISong[];
  id: number;
  song: ISong;
  categoryId: number;

  constructor(
    private songService: SongService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = +param.get('id');
      this.getSongById(this.id);
    });
  }

  playThisSong(id: any) {
    this.songService.countViews(id).subscribe();
    this.songService.getSongById(id).subscribe(value => {
      this.song = value;
      localStorage.setItem('songSelected', JSON.stringify(this.song));
      window.location.reload();
    });
  }

  getSongById(id) {
    this.songService.getSongById(this.id).subscribe(value => {
      this.song = value;
      this.categoryId = this.song.category.id;
      this.songService.getSongByCategoryId(this.categoryId).subscribe(value1 => {
        this.songsRecommend = value1;
      });
    });
  }
}
