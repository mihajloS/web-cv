import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  collapse: Boolean = true

  constructor() { }

  navToggle() {
    this.collapse = !this.collapse
  }

  ngOnInit() {
  }

}
