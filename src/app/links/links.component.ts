import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Link} from "../link";

@Injectable()
@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getLinks();
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
