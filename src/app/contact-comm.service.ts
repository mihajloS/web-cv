import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactCommService {
  url: String = 'https://fierce-hamlet-10382.herokuapp.com'
  constructor(private http: HttpClient ) { }

  sendEmail(email: Contact) {
    return this.http.post(`${this.url}/contact_mihajlo`, email)
  }
}