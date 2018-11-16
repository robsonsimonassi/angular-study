import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dateMessage:string;

  constructor() {
    setInterval(() => {
      this.dateMessage = new Date().toLocaleDateString() + ' - ' +new Date().toLocaleTimeString();
    }, 1000);
  }

  ngOnInit() {
  }

}
