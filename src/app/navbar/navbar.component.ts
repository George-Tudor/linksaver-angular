import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  links = [
    { path: 'links', label: 'Links' },
    { path: 'about', label: 'About' },
    { path: 'contact', label: 'Contact' }
  ];

}
