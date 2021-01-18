import { NgModule } from '@angular/core';
import {ResetpasswordComponent} from './client/user/resetpassword/resetpassword.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './helper/auth-guard';
import {LoginComponent} from './visiter/login/login.component';
import {RegisterComponent} from './visiter/register/register.component';
import {MyProfileComponent} from './client/user/my-profile/my-profile.component';
import {CreateSongComponent} from './song/create-song/create-song.component';
import {MySongComponent} from './client/user/my-song/my-song.component';
import {UpdateSongComponent} from './song/update-song/update-song.component';
import {ListSongComponent} from './song/list-song/list-song.component';
import {HomeComponent} from './landing-page/home/home.component';
import {UpdateProfileComponent} from './client/user/update-profile/update-profile.component';


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
    path: 'songs/my-songs/:id',
    component: MySongComponent
  },
  {
    path: 'songs/update/:id',
    component: UpdateSongComponent
  },

  {
    path: 'songs',
    component: ListSongComponent,
    // children: [
    // {
    //   path: 'my-songs/:id',
    //   component: MySongComponent
    // },
    //   {
    //     path: 'update/:id',
    //     component: UpdateComponent
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
