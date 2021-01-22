import { Component, OnInit } from '@angular/core';
import {CommentSongService} from '../../service/comment/comment-song.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {UserService} from '../../service/user/user.service';
import {SongService} from '../../service/song/song.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CommentPlaylistService} from '../../service/comment/comment-playlist.service';
import {PlayListService} from '../../service/playList/play-list.service';
import {User} from '../../model/user';
import {ICommentSong} from '../../model/comment/ICommentSong';
import {UserToken} from '../../model/user-token';
import {ICommentPlaylist} from '../../model/comment/icomment-playlist';
import {Playlist} from '../../model/playList/playlist';

@Component({
  selector: 'app-comment-playlist',
  templateUrl: './comment-playlist.component.html',
  styleUrls: ['./comment-playlist.component.css']
})
export class CommentPlaylistComponent implements OnInit {
  date: string;
  id: number;
  user: User;
  addCommentForm: FormGroup;
  comments: ICommentPlaylist[];
  userCurrent: UserToken;
  constructor(
    private commentPlaylistService: CommentPlaylistService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private playlistService: PlayListService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userCurrent = this.authService.currentUserValue;
    this.addCommentForm = this.fb.group({
      comment: [null]
    });
    const userFromLocalStorage = this.authService.currentUserValue;
    this.userService.getUserByUsername(userFromLocalStorage.username).subscribe(value => {
      this.user = value;
    });
    this.getAllComment();

  }
  getAllComment() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = +param.get('id');
      console.log(this.id);
      this.commentPlaylistService.getCommentByPlaylistId(this.id).subscribe(value => {
        this.comments = value;
      });
    });
  }

  getOnePlaylist(id: any) {
    return this.playlistService.getOnePlaylist(id).toPromise();
  }
  async addComment() {
    const playlist: Playlist = await this.getOnePlaylist(this.id);
    // @ts-ignore
    if (document.getElementById('inputComment').value !== '') {
      const commentTest: ICommentPlaylist = this.addCommentForm.value;
      commentTest.comment = this.addCommentForm.value.comment;
      commentTest.user = this.user;
      commentTest.playList = playlist;
      this.commentPlaylistService.addComment(commentTest).subscribe(() => {
        this.commentPlaylistService.getCommentByPlaylistId(this.id).subscribe(value1 => {
          this.comments = value1;
          console.log(this.comments);
          this.getAllComment();
        });
      });
      this.clear();
    }
  }
  clear() {
    // @ts-ignore
    const input: HTMLElement = document.getElementById('inputComment').value = '';
  }

}
