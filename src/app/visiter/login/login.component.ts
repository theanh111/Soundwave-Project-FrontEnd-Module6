import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import { first } from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  currentUser: UserToken;
  formLogin: FormGroup;
  user: User = {
    username: '',
    password: ''
  };

  constructor(private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.authService.currentUser.subscribe(value => this.currentUser = value);
    // this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/host';
    this.formLogin = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  // tslint:disable-next-line:typedef
  login() {
    if (this.user.username === '' || this.user.password === '') {
      alert('Please enter your username, password!');
    } else {
      // @ts-ignore
      this.authService.login(this.user.username, this.user.password)
        .pipe(first())
        .subscribe(data => {
          // tslint:disable-next-line:no-unused-expression
          localStorage.removeItem('songSelected');
          window.location.reload();
          window.location.replace('');
          // this.router.navigate([this.returnUrl]);
        });
    }
  }
}
