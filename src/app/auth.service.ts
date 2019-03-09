import { Injectable } from '@angular/core';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username, password) {
    //
  }

  setSession(authResult) {
    const expirationTime = moment().add(1, 'hours').valueOf().toString()
    localStorage.setItem('tokenExpirationTime', expirationTime);
    localStorage.setItem('token', '** fake token **')
  }

  logout() {
    localStorage.removeItem('tokenExpirationTime')
    localStorage.removeItem('token')
    // later: send api request
  }

  sessionExpired():boolean {
    const expirationTimestamp = localStorage.getItem('tokenExpirationTime')
    return moment().isBefore(moment(expirationTimestamp))
  }
}
