import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  public log(...args) {
    console.log(new Date(), ...args);
  }

  public debug(...args) {
    console.log(new Date(), ...args);
  }

  public error(...args) {
    console.log(new Date(), ...args);
  }

  public warn(...args) {
    console.log(new Date(), ...args);
  }
}
