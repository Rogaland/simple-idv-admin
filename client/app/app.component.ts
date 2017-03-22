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
  isLoading: boolean = false;
  users: any[];
  userCount: number;

  constructor(private http: Http) { }

  getUsers(evt) {
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
