import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {UserService} from '../../service/user/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';

import {CommentSongService} from '../../service/comment/comment-song.service';
import {ICommentSong} from '../../model/comment/ICommentSong';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  id: number;
  user: User;
  addCommentForm: FormGroup;
  comment: ICommentSong;
  comments: ICommentSong[];

  constructor(
    private commentService: CommentSongService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = +param.get('id');
      console.log('Test ID: ' + this.id);
      this.commentService.getCommentBySongId(this.id).subscribe(value => {
        this.comments = value;
      });
    });
    // this.addCommentForm = this.fb.group({
    //     comment: [null]
    // });
    const userFromLocalStorage = this.authService.currentUserValue;
    this.userService.getUserByUsername(userFromLocalStorage.username).subscribe(value => {
      this.user = value;
    });
  }

  // addComment() {
  //   this.comment.comment = this.addCommentForm.value.comment;
  //   this.comment.user = this.user;
  //   this.comment.song = this.song;
  //   this.commentService.addComment(this.comment).subscribe(() => {
  //     alert('Ok');
  //     this.router.navigate(['/songs/detail']);
  //   });
  // }

  clear() {
    document.getElementById('inputComment').value = '';
  }
}
