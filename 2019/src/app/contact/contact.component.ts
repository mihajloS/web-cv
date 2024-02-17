import { Component, OnInit } from '@angular/core';
import { Contact } from "../contact";
import { ContactCommService } from '../contact-comm.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  model:Contact = new Contact()
  submit:Boolean = false

  constructor(private contactService: ContactCommService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submit = true
    this.contactService.sendEmail(this.model).subscribe((res) => {
      console.log('done', res)
    })
  }

}
