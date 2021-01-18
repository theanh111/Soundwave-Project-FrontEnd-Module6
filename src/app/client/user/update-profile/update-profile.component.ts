import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {UserToken} from '../../../model/user-token';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../service/user/user.service';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  selectedFile: File;
  imagePreview: string;
  user: User;
  currentUser: UserToken;
  updateUserForm: FormGroup;
  downloadURL: Observable<string>;
  avatar = '';

  constructor(
    private storage: AngularFireStorage,
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.updateUserForm = this.fb.group({
      username: [''],
      fullName: [''],
      phoneNumber: [''],
      email: [''],
      address: ['']
    });
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value;
      this.userService.getUserByUsername(value.username).subscribe(value1 => {
        this.user = value1;
        this.updateUserForm.setValue({
          username: this.user.username,
          fullName: this.user.fullName,
          phoneNumber: this.user.phoneNumber,
          email: this.user.email,
          address: this.user.address
        });
      });
    });
  }

  updateUser() {
    this.user.username = this.updateUserForm.value.username;
    this.user.fullName = this.updateUserForm.value.fullName;
    this.user.phoneNumber = this.updateUserForm.value.phoneNumber;
    this.user.email = this.updateUserForm.value.email;
    this.user.address = this.updateUserForm.value.address;
    this.user.avatar = this.avatar;
    this.userService.updateUser(this.user).subscribe(() => {
      alert('Cập nhật User thành công!');
      this.router.navigate(['/profile']);
    }, error => {
      alert('Lỗi!');
    });
  }

  loadFile(event) {
    const output = (document.getElementById('output') as HTMLImageElement);
    output.src = URL.createObjectURL(event.target.files[0]);
    this.imagePreview = output.src;
    console.log(output.src);
    output.onload = () => {
      URL.revokeObjectURL(output.src);
    };
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.avatar = url;
            }
            console.log(this.fb);
          });
        })
      ).subscribe(url => {
      if (url) {
        console.log(url);
      }
    });
  }

  // saveAvatar(event) {
  //   const n = Date.now();
  //   const file = event.target.files[0];
  //   const filePath = `RoomsImages/${n}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(`RoomsImages/${n}`, file);
  //   task
  //     .snapshotChanges()
  //     .pipe( finalize(() => {
  //         this.downloadURL = fileRef.getDownloadURL();
  //         this.downloadURL.subscribe(url => {
  //           if (url) {
  //             this.avatar = url;
  //           }
  //           console.log(this.fb);
  //         });
  //       })
  //     ).subscribe(url => {
  //     if (url) {
  //       console.log(url);
  //     }
  //   });
  // }

}
