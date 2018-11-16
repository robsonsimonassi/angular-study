import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList = null;

  formUser = new FormGroup({
     $key: new FormControl(null),
     fullName: new FormControl('', [Validators.required, Validators.minLength(8)]),
     email: new FormControl('', [Validators.required, Validators.email]),
     age: new FormControl(''),
     sex: new FormControl('', Validators.required),
  })

  constructor(private firebase:AngularFireDatabase) {
    this.userList = this.firebase.list('users');
    this.userList.snapshotChanges();
  }

  getUsers(){
      this.userList = this.firebase.list('users');
      return this.userList.snapshotChanges();
  }

  insertUser(user){
      this.userList.push({
        fullName: user.fullName,
        email: user.email,
        age: user.age,
        sex: user.sex
      });
    }

    populateForm(user){
      this.formUser.setValue(user);
    }

    updateUser(user){
      this.userList.update(user.$key, {
        fullName: user.fullName,
        email: user.email,
        age: user.age,
        sex: user.sex
      })
    }

    deleteUser($key: string){
       this.userList.remove($key);
     }


}
