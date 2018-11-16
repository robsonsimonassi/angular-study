import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  submitted: boolean;
  showSucessMessage: boolean;
  formUser = this.userService.formUser.controls;

  constructor(private userService: UserService) { }

  onSubmit(){
     this.submitted = true;


     if(this.userService.formUser.valid){
       if(this.userService.formUser.get('$key').value == null){
         this.userService.insertUser(this.userService.formUser.value);
       }
       else{
         this.userService.updateUser(this.userService.formUser.value);
       }
       this.showSucessMessage=true;
       setTimeout(() => this.showSucessMessage = false, 3000);
       this.submitted = false;
       this.userService.formUser.reset();
 }
}


  ngOnInit() {
  }

}
