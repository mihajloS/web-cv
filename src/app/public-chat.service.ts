import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import { Rpc } from "./rpc";

@Injectable({
  providedIn: 'root'
})
export class PublicChatService {

  private ws = null;
  private url = 'ws://localhost:8000'
  private protocol = 'm-protocol'
  private subject = webSocket({url: this.url, protocol: this.protocol})
  private reqID = 0;
  private storedPromisses : Map<number, any> = new Map();

  *nextReqID() {
    yield this.reqID += 1;
  }


  public initSocket() {
    this.ws = new WebSocket(this.url, this.protocol);
    this.ws.onmessage  = this.onMessage.bind(this);
    this.ws.onopen = this.onOpen;
    this.ws.onerror = this.onError;
    this.ws.onclose = this.onClose;
  }

  private onMessage({data: rawData}) {
    console.log("WS incoming :", rawData);
    const data: Rpc = JSON.parse(rawData) as Rpc;
    const promise = this.storedPromisses.get(data['id']);
    if (!promise)
      return;
    if (promise.resolve && data.result)
      promise.resolve(data.result);
    if (promise.error && data.error)
      promise.error(data.error);
    this.storedPromisses.delete(data['id']);
  }

  private onClose(data) {
    console.log('WS close :', data);
  }

  private onError(err) {
    console.log("WS error :", err);
  }


  private onOpen(data) {
    console.log("WS open", data);
  }

  public sendMessage(text:string):Promise<any> {
    const data:object = {"message": "text"};
    return this.sendData(data);
  }

  private sendData(params:any):Promise<any> {
    const rid = this.nextReqID().next().value;
    const data:Object = {"method": "Chat.send", "params": params, "jsonrpc": "2.0", "id": rid}
    console.log('WS outgoing :', data);
    this.ws.send(JSON.stringify(data));
    return new Promise((resolve, error) => {
      this.storedPromisses.set(rid, {resolve, error});
    })
  }

  public join(nickname:String) {
    const data = {"method": "Chat.join", "params": {"nickname": nickname}, "jsonrpc": "2.0", "id": 123};
    this.ws.send(JSON.stringify(data));
  }

  constructor() {
    this.initSocket()
  }
}
