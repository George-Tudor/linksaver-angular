import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  title = 'Linksaver Angular';
  credentials = {
    username: '',
    password: ''
  }


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  login() {
    console.log('It works')
    this.http.post<any>('http://localhost:8080/authenticate', this.credentials).subscribe(data => {
      console.log(data);
      window.localStorage['token'] = data.token
    })
  }

  register() {
    this.http.post<any>('http://localhost:8080/register', this.credentials).subscribe(data => {
      console.log(data);
    })
  }

}
