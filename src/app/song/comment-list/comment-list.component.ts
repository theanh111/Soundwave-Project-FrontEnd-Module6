import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {UserService} from '../../service/user/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';

import {CommentSongService} from '../../service/comment/comment-song.service';
import {ICommentSong} from '../../model/comment/ICommentSong';
import {SongService} from '../../service/song/song.service';
import {log} from 'util';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  date: string;
  id: number;
  user: User;
  addCommentForm: FormGroup;
  commentInput: string;
  commentOfThisSong: ICommentSong;
  comments: ICommentSong[];

  constructor(
    private commentService: CommentSongService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private songService: SongService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.addCommentForm = this.fb.group({
      comment: [null]
    });
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = +param.get('id');
      console.log('Test ID: ' + this.id);
      this.commentService.getCommentBySongId(this.id).subscribe(value => {
        this.comments = value;
      });
    });
    const userFromLocalStorage = this.authService.currentUserValue;
    this.userService.getUserByUsername(userFromLocalStorage.username).subscribe(value => {
      this.user = value;
    });
  }

  addComment() {
    this.songService.getSongById(this.id).subscribe(value => {
      const commentTest: ICommentSong = this.addCommentForm.value;
      commentTest.comment = this.addCommentForm.value.comment;
      commentTest.user = this.user;
      commentTest.song = value;
      this.commentService.addComment(commentTest).subscribe(() => {
        alert('Ok');
        console.log(commentTest);
        window.location.reload();
      });
    });
  }

  clear() {
    // @ts-ignore
    let input: HTMLElement = document.getElementById('inputComment').value = '';
  }
}
