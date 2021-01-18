import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MySongComponent } from './client/user/my-song/my-song.component';
import { MyProfileComponent } from './client/user/my-profile/my-profile.component';
import { UpdateProfileComponent } from './client/user/update-profile/update-profile.component';
import { CreateSongComponent } from './song/create-song/create-song.component';
import { ListSongComponent } from './song/list-song/list-song.component';
import { UpdateSongComponent } from './song/update-song/update-song.component';
import { PlaySongComponent } from './song/play-song/play-song.component';
import { LoginComponent } from './visiter/login/login.component';
import { RegisterComponent } from './visiter/register/register.component';
import { ResetpasswordComponent } from './client/user/resetpassword/resetpassword.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MySongComponent,
    MyProfileComponent,
    UpdateProfileComponent,
    CreateSongComponent,
    ListSongComponent,
    UpdateSongComponent,
    PlaySongComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
