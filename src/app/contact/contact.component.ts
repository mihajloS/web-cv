import { Component, OnInit } from '@angular/core';
import { Contact } from "../contact";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  model:Contact = new Contact()
  submit:Boolean = false

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submit = true
  }

}
