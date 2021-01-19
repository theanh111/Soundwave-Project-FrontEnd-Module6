// @ts-ignore
import { BrowserModule } from '@angular/platform-browser';
// @ts-ignore
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MySongComponent } from './client/user/my-song/my-song.component';
import { MyProfileComponent } from './client/user/my-profile/my-profile.component';
import { UpdateProfileComponent } from './client/user/update-profile/update-profile.component';
import { CreateSongComponent } from './song/create-song/create-song.component';
import { ListSongComponent } from './song/list-song/list-song.component';
import { UpdateSongComponent } from './song/update-song/update-song.component';
import { LoginComponent } from './visiter/login/login.component';
import { RegisterComponent } from './visiter/register/register.component';
import { ResetpasswordComponent } from './client/user/resetpassword/resetpassword.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './landing-page/header/header.component';
import { FooterComponent } from './landing-page/footer/footer.component';
// @ts-ignore
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// @ts-ignore
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AngularFireStorageModule} from '@angular/fire/storage';
// @ts-ignore
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {JwtInterceptor} from './helper/jwt-interceptor';
import {ErrorInterceptor} from './helper/error-interceptor';
import { HomeComponent } from './landing-page/home/home.component';
// @ts-ignore
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { SearchSongComponent } from './song/search-song/search-song.component';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    MySongComponent,
    MyProfileComponent,
    UpdateProfileComponent,
    CreateSongComponent,
    ListSongComponent,
    UpdateSongComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SearchSongComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    NgbDropdownModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
