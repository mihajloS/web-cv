import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicChatService {

  private ws;
  private url = 'ws://localhost:8000'
  private protocol = 'm-protocol'

  initSocket() {
    this.ws = new WebSocket(this.url, this.protocol);
    this.ws.onmessage  = this.onMessage;
  }

  onMessage({data}) {
    console.log('msg came', JSON.stringify(data))
    // alert('dosla poruka')
  }

  sendMessage(text) {
    const data:Object = {"method": "Chat.send", "params": {"message": text}, "jsonrpc": "2.0", "id": 123}
    this.ws.send(JSON.stringify(data));
  }

  join(nickname) {
    const data = {"method": "Chat.join", "params": {"nickname": nickname}, "jsonrpc": "2.0", "id": 123};
    this.ws.send(JSON.stringify(data));
  }

  constructor() {
    this.initSocket()
  }
}
