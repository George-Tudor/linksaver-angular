import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent implements OnInit {

  greetingText: string = '';
  fullGreetingText: string = 'Welcome to Linksaver!!!!';

  constructor() { }

  ngOnInit(): void {
    this.typeGreeting();
  }

  typeGreeting() {
    let i = 0;
    const typingInterval = setInterval(()=> {
      if (i < this.fullGreetingText.length) {
        this.greetingText += this.fullGreetingText.charAt(i);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
  }

}
