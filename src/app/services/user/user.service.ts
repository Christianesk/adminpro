import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { URL_SERVICES } from 'src/app/config/config';

import Swal from 'sweetalert2'

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.loadStorage();
  }

  createUser(user: User) {
    let url = URL_SERVICES + '/user';

    return this.http.post(url, user)
      .pipe(map((resp: any) => {
        Swal.fire('Usario Creado', user.email, 'success');
        return resp.usuario;
      }));
  }

  loginGoogle(token: string) {
    let url = URL_SERVICES + '/login/google';

    return this.http.post(url, { token })
      .pipe(map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.user);
        return true;
      }));;

  }


  logIn(user: User, rememberMe: boolean = false) {

    if (rememberMe) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICES + '/login';

    return this.http.post(url, user)
      .pipe(map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.user);
        return true;
      }));

  }

  loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }


  saveStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  isLogged() {
    return (this.token.length > 5) ? true : false;
  }

  logOut() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }


}
