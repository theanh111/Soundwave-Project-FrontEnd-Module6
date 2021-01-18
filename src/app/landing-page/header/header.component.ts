import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  // @ts-ignore
  currentUser: UserToken;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value;
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
      });
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
