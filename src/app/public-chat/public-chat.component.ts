import { Component, OnInit, Input } from '@angular/core';
import { PublicChatService } from '../public-chat.service';
import { Subject } from 'rxjs';
import { Rpc } from '../rpc';
import { LogService } from '../shared/log.service';

@Component({
  selector: 'app-public-chat',
  templateUrl: './public-chat.component.html',
  styleUrls: ['./public-chat.component.css']
})
export class PublicChatComponent implements OnInit {

  chatText = "";
  active_users_count:number = 0;
  me = <any>{name: 'Anonymous user', presence: 'online', userId: null};
  private users: object[] = [
    // {userId: 1, nickname: 'Pera'},
    // {userId: 2, nickname: 'Mika'},
    // {userId: 3, nickname: 'Zika'},
  ]
  private chatHistory = [
    {me: true, texts: ["Hey this is me"]},
    {me: false, texts: ["Hey man!"]},
    {me: true, texts: ["Me again", "Lets go out", "Day is amazing to be out on the sun", "Lets exercise outdoors"]},
    {me: false, texts: ["I am in!", "Lets meet in 20"]},
    {me: true, texts: ["Deal"]},
  ];

  private nickname:string = null;

  constructor(private chatAPI: PublicChatService, private logger: LogService) {
    chatAPI.notifications('Chat.onMessage').subscribe((data) => {
      if (data.userId == this.me.userId)
        return;
      this.addToHistory(data.message, false);
      this.scrollToBottom();
    },
    (e) => {
      this.logger.error('Notification subscription error :', e);
    });

    chatAPI.notifications('Chat.onLeave').subscribe((data) => {
      this.users = this.users.filter((item:any) => {
        return item.userId != data.userId
      });
      this.logger.debug('Roster list after leave', this.users);
    },
    (e) => {
      this.logger.error('Notification subscription error :', e);
    });

    chatAPI.notifications('Chat.onJoin').subscribe((data) => {
      // handle self join
      for (let value of this.users) { if (value['userId'] === data.userId) { return; } }
      // handle other joins
      this.users.push(data);
      this.logger.debug('Roster list after join', this.users);
    },
    (e) => {
      this.logger.error('Notification subscription error :', e);
    });
  }

  ngOnInit() {
      this.chatAPI.initSocket(()=> {
        this.me['name'] = 'Mihajlo';
        this.chatAPI.join(this.me['name']).then((res) => {
          this.me.userId = res.userId;
          this.users = res.roster;
        });
        this.active_users_count = this.users.length;
      })
  }

  keyUp(msg:string) {
    this.chatText = msg;
  }

  sendMessage() {
    if (this.chatText.trim().length === 0)
      return;

    this.chatAPI.sendMessage(this.chatText).then((res)=> {
      // TODO: Remove my message if this never happens
    }, (e)=> {
      // TODO: Remove my message if this fails
      this.logger.log("msg error", e);
    });

    this.addToHistory(this.chatText, true);
    // clear text input
    document.getElementsByTagName('input')[0].value = '';
    this.chatText = '';

    // scroll to bottom of chat messages
    this.scrollToBottom();
  }

  scrollToBottom() {
    var objDiv = document.getElementById("messages");
    setTimeout(() =>{objDiv.scrollTop = objDiv.scrollHeight;}, 0)
  }

  addToHistory(text, me) {
    // add text to chat
    if (this.chatHistory[this.chatHistory.length-1].me)
      this.chatHistory[this.chatHistory.length-1].texts.push(text);
    else
      this.chatHistory.push({me: me, texts: [text]});
  }

}
