import { Component, OnInit, Input } from '@angular/core';
import { InputDecorator } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-public-chat',
  templateUrl: './public-chat.component.html',
  styleUrls: ['./public-chat.component.css']
})
export class PublicChatComponent implements OnInit {

  chatText = "";
  active_users_count:number = 0;
  me:object = {name: 'Mihajlo', presence: 'online'};
  users: String[] = [
    'Jovica',
    'Ivica',
    'Marica',
    'Amy',
    '__pink_power__',
    '@soldering@',
    'Sm1th',
    'Walter@Man',
    'WakamakaFon',
    'Semuel 3L 1990',
    'Go go go',
    'Tired of names',
    'Stupid words',
    'Just coming out of',
    'Me, because its late',
    'Moving with development',
    'Either way'
  ]
  chatHistory = [
    {me: true, text: "Hey this is me"},
    {me: false, text: "Hey man!"},
    {me: true, text: "Me again"},
    {me: true, text: "Lets go out"},
    {me: true, text: "Day is amazing to be out on the sun"},
    {me: true, text: "Lets exercise outdoors"},
    {me: false, text: "I am in!"},
    {me: false, text: "Lets meet in 20"},
    {me: true, text: "Deal"},
  ];

  constructor() { }

  ngOnInit() {
    this.active_users_count = this.users.length;
  }

  keyUp(msg) {
    this.chatText = msg;
  }

  sendMessage() {
    if (this.chatText.trim().length === 0)
      return;

    // add text to chat
    this.chatHistory.push({me: true, text: this.chatText});

    // clear text input
    document.getElementsByTagName('input')[0].value = '';
    this.chatText = '';

    // scroll to bottom of chat messages
    var objDiv = document.getElementById("messages");
    setTimeout(() =>{objDiv.scrollTop = objDiv.scrollHeight;}, 0)

  }

}
