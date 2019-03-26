import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import { Rpc } from "./rpc";
import { Subject } from "rxjs";
import { LogService } from './shared/log.service';

@Injectable({
  providedIn: 'root'
})
export class PublicChatService {

  private notificationSubscriptions: string[] = [];
  private notifySubject = new Subject();
  private ws = null;
  private url = 'ws://localhost:8000'
  private protocol = 'm-protocol'
  private subject = webSocket({url: this.url, protocol: this.protocol})
  private reqID = 0;
  private storedPromisses : Map<number, any> = new Map();

  *nextReqID() {
    yield this.reqID += 1;
  }

  private initSocket() {
    this.ws = new WebSocket(this.url, this.protocol);
    this.ws.onmessage  = this.onMessage.bind(this);
    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onerror = this.onError.bind(this);
    this.ws.onclose = this.onClose.bind(this);
  }

  private onMessage({data: rawData}) {
    this.logger.log("WS incoming :", rawData);
    const data: Rpc = new Rpc(JSON.parse(rawData));
    if (data.isNotification())
      this.handleNotification(data);
    else
      this.handleResponse(data);

  }

  private handleNotification(data:Rpc) {
    if (this.notificationSubscriptions.includes(data.method))
      this.notifySubject.next(data.data);
  }

  public notifications(type):Subject<any> {
    if (!this.notificationSubscriptions.includes(type))
      this.notificationSubscriptions.push(type);
    return this.notifySubject;
  }

  private handleResponse(data:Rpc) {
    const promise = this.storedPromisses.get(data['id']);
    if (!promise)
      return;
    if (promise.resolve && data.isResult())
      promise.resolve(data.data);
    if (promise.error && data.isError())
      promise.error(data.data);
    this.storedPromisses.delete(data['id']);
  }

  private onClose(data) {
    this.logger.log('WS close :', data);
  }

  private onError(err) {
    this.logger.error("WS error :", err);
  }


  private onOpen(data) {
    this.logger.log("WS open", data);
  }

  public sendMessage(text:string):Promise<any> {
    const data:object = {"message": text};
    return this.sendData("Chat.send", data);
  }

  private sendData(method:string, params:any):Promise<any> {
    const rid = this.nextReqID().next().value;
    const data:Object = {"method": method, "params": params, "jsonrpc": "2.0", "id": rid}
    this.logger.log('WS outgoing :', data);
    this.ws.send(JSON.stringify(data));
    return new Promise((resolve, error) => {
      this.storedPromisses.set(rid, {resolve, error});
    })
  }

  public join(nickname:String):Promise<any> {
    const data = {"nickname": nickname};
    return this.sendData('Chat.join', data);
  }

  constructor(private logger: LogService) {
    this.initSocket()
  }
}
