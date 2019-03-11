import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-chat',
  templateUrl: './public-chat.component.html',
  styleUrls: ['./public-chat.component.css']
})
export class PublicChatComponent implements OnInit {

  active_users_count:number = 0;

  constructor() { }

  ngOnInit() {
    console.log(document.getElementsByTagName('li').length);
    this.active_users_count = document.getElementsByTagName('li').length;
  }

}
