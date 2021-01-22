import { Component, OnInit } from '@angular/core';
import {PlayListService} from '../../../service/playList/play-list.service';
import {Playlist} from '../../../model/playList/playlist';
import {User} from '../../../model/user';
import {AuthService} from '../../../service/auth/auth.service';
import {UserService} from '../../../service/user/user.service';

@Component({
  selector: 'app-my-playlists',
  templateUrl: './my-playlists.component.html',
  styleUrls: ['./my-playlists.component.css']
})
export class MyPlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  user: User;
  constructor(
    private playlistService: PlayListService,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const userFromLocalStorage = this.authService.currentUserValue;
    this.userService.getUserByUsername(userFromLocalStorage.username).subscribe(value => {
      this.user = value;
      this.getMyPlaylists(this.user.id);
    });
  }
  getMyPlaylists(id) {
    this.playlistService.getMyPlaylists(id).subscribe(value => this.playlists = value);
  }

}
