import { Component, OnInit } from '@angular/core';
import {PlayListService} from '../../service/playList/play-list.service';
import {ISong} from '../../model/song/ISong';
import {SongService} from '../../service/song/song.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {SongPlaylistService} from '../../service/songPlaylist/song-playlist.service';
import {LikeSongService} from '../../service/like/like-song.service';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css']
})
export class PlaylistDetailsComponent implements OnInit {

  songs: ISong[] = [];
  song: ISong;
  pl_id: number;
  // songlikes: number;
  nameSearch: string;

  constructor(
    private songService: SongService,
    private activatedRoute: ActivatedRoute,
    private playlistService: PlayListService,
    private songPlaylistService: SongPlaylistService,
    private likeSongService: LikeSongService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      // @ts-ignore
      this.pl_id = param.get('id');
      this.getAllSongPlaylist(this.pl_id);
    });
  }

  getAllSongPlaylist(id: number) {
    this.songPlaylistService.getSongByPlaylist(id).subscribe((data: any) => {
      this.songs = data;
      this.songs.map(song => {
        this.likeSongService.getAllLikeUser(song.id).subscribe(value => {
          song.like = value;
        })
      })
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
