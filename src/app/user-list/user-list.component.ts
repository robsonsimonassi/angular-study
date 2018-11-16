import { Component, OnInit } from '@angular/core';

import { UserService } from '../user/user.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userArray = [];
  showDeletedMessage: boolean;
  searchText: string = "";

  constructor(private userService: UserService) {}

  filterCondition(user){
    return user.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
  }

  onDelete($key: string){
    if(confirm('Tem certeza que deseja excluir esse registro ?')){
      this.userService.deleteUser($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }

  ngOnInit() {
    this.userService.getUsers;
    this.userService.getUsers().subscribe(
      list => {
      this.userArray = list.map(item =>{
         return {
           $key: item.key,
        ...item.payload.val()
        };
      });
    });
  }

}
