import { Injectable } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { User } from '@app/models/api.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUser() {
    var user: User = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  storeUser(user: any) {
    user['token_present'] = user['token_present'] > 0;
    localStorage.setItem('user', JSON.stringify(user));
  }
}
