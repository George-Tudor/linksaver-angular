import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Link } from './link';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Linksaver Angular';
  credentials = {
    username: '',
    password: ''
  }
  newLink: Link = {
    title: '',
    description: '',
    url: '',
    imageUrl: '',
    tags: []
  }
  newTag = ''
  links: Array<any> = []
  tags: Array<any> = []

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getLinks();
  }

  login() {
    console.log('It works')
    this.http.post<any>('http://localhost:8080/authenticate', this.credentials).subscribe(data => {
      console.log(data);
      window.localStorage['token'] = data.token
      this.getLinks();
    })
  }

  register() {
    this.http.post<any>('http://localhost:8080/register', this.credentials).subscribe(data => {
      console.log(data);
    })
  }

  addLink() {
    const headers = {
      Authorization: `Bearer ${window.localStorage['token']}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    this.http.post<any>('http://localhost:8080/links', this.newLink, {headers}).subscribe(data => {
      console.log(data);
      this.getLinks();
    })
  }

  getLinks() {
    const headers = {
      Authorization: `Bearer ${window.localStorage['token']}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    this.http.get<any>('http://localhost:8080/links', {headers}).subscribe(data => {
      this.links = data;
    })
  }

  deleteLink(link: any) {
    const headers = {
      Authorization: `Bearer ${window.localStorage['token']}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    this.http.delete<any>('http://localhost:8080/links/' + link.id, {headers}).subscribe(data => {
      console.log(data);
      console.log("IT'S WORKING!!!!")
      this.getLinks();
    })
  }

  onInputTagName(event: Event) {
    this.newTag = (<HTMLInputElement>event.target).value;
  }

  addTag(link:any) {
    const headers = {
      Authorization: `Bearer ${window.localStorage['token']}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    this.http.post<any>(`http://localhost:8080/links/${link.id}/add-tag/`, this.newTag, {headers}
  ).
    subscribe(data => {
      console.log(data);
      this.getLinks();
    })
  }

  deleteTag(link:any, tag:any) {
    const headers = {
      Authorization: `Bearer ${window.localStorage['token']}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    this.http.delete<any>(`http://localhost:8080/links/${link.id}/delete-tag/${tag.id}`, {headers}).subscribe(data => {
      this.getLinks();
    })
  }
}
