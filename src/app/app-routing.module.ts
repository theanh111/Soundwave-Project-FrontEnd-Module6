// @ts-ignore
import { NgModule } from '@angular/core';
import {ResetpasswordComponent} from './client/user/resetpassword/resetpassword.component';
// @ts-ignore
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './helper/auth-guard';
import {LoginComponent} from './visiter/login/login.component';
import {RegisterComponent} from './visiter/register/register.component';
import {MyProfileComponent} from './client/user/my-profile/my-profile.component';
import {CreateSongComponent} from './song/create-song/create-song.component';
import {UpdateSongComponent} from './song/update-song/update-song.component';
import {ListSongComponent} from './song/list-song/list-song.component';
import {HomeComponent} from './landing-page/home/home.component';
import {UpdateProfileComponent} from './client/user/update-profile/update-profile.component';
import {SearchSongComponent} from './song/search-song/search-song.component';
import {DetailSongComponent} from './song/detail-song/detail-song.component';
import {PlaylistDetailsComponent} from './playlist/playlist-details/playlist-details.component';




const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: MyProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/update',
    component: UpdateProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'songs/create',
    component: CreateSongComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'songs/detail/:id',
    component: DetailSongComponent
  },
  {
    path: 'songs/update/:id',
    component: UpdateSongComponent
  },
  {
    path: 'songs/search/:name',
    component: SearchSongComponent
  },
  {
    path: 'songs',
    component: ListSongComponent,
  },
  {
    path: 'playlist/:id',
    component: PlaylistDetailsComponent,
  }
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
