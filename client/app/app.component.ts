import { Component } from '@angular/core';

import { Http } from "@angular/http";
import { Observable, Observer, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchString: string;
  attributeListButtonText = 'Vis attributter';
  isLoading = false;
  attributesIsVisible = false;
  users: any[];
  userCount: number;
  getKey = Object.keys;
  constructor(private http: Http) { }

  clearSearch() {
    this.searchString = '';
    this.users = [];
    this.userCount = 0;
    this.isLoading = false;
  }

  isArray(object: any) {
    return Array.isArray(object);
  }

  toggleAttributeList() {
    this.attributesIsVisible = !this.attributesIsVisible;
    if (this.attributesIsVisible) {
      this.attributeListButtonText = 'Skjul attributter';
    }
    else {
      this.attributeListButtonText = 'Vis attributter';
    }
  }
  getUsers(evt) {
    console.log('getUsers');
    if (this.searchString.length > 1) {
      this.users = [];
      this.userCount = 0;
      if (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      }
      this.isLoading = true;
      this.http.get(`/api/users?q=${this.searchString}`)
        .map(result => result.json())
        .catch(error => {console.error(error); return error; })
        .subscribe((result: any) => {
          if (result.users) { this.users = result.users; }
          if (result.user_count) { this.userCount = result.user_count; }
          this.isLoading = false;
        });
    }
  }
}
