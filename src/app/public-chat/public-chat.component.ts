import { Component, OnInit, Input } from '@angular/core';
import { PublicChatService } from '../public-chat.service';

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
    {me: true, texts: ["Hey this is me"]},
    {me: false, texts: ["Hey man!"]},
    {me: true, texts: ["Me again", "Lets go out", "Day is amazing to be out on the sun", "Lets exercise outdoors"]},
    {me: false, texts: ["I am in!", "Lets meet in 20"]},
    {me: true, texts: ["Deal"]},
  ];

  constructor(private chatAPI: PublicChatService) { }

  ngOnInit() {
    this.active_users_count = this.users.length;
    setTimeout(()=>{
      this.chatAPI.join('MikaZika123');
    }, 2000)
  }

  keyUp(msg) {
    this.chatText = msg;
  }

  sendMessage() {
    if (this.chatText.trim().length === 0)
      return;

    this.chatAPI.sendMessage(this.chatText);

    // add text to chat
    if (this.chatHistory[this.chatHistory.length-1].me)
      this.chatHistory[this.chatHistory.length-1].texts.push(this.chatText);
    else
    this.chatHistory.push({me: true, texts: [this.chatText]});
    // clear text input
    document.getElementsByTagName('input')[0].value = '';
    this.chatText = '';

    // scroll to bottom of chat messages
    var objDiv = document.getElementById("messages");
    setTimeout(() =>{objDiv.scrollTop = objDiv.scrollHeight;}, 0)

  }

}
