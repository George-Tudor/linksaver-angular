import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from "rxjs";
import { throwError } from "rxjs";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  title = 'Welcome to Linksaver';
  credentials = {
    username: '',
    password: ''
  }


  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.http.post<any>('http://localhost:8080/authenticate', this.credentials).pipe(
        catchError(err => {
          console.error(err);
          this.router.navigate(['error']);
          return throwError(err);
        })
    ).subscribe(data => {
      if (data && data.token) {
        console.log(data);
        window.localStorage['token'] = data.token;
        this.router.navigate(['links']);
      }
    });
  }

  register() {
    this.http.post<any>('http://localhost:8080/register', this.credentials).subscribe(data => {
      console.log(data);
    })
  }

}
