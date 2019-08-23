import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { URL_SERVICES } from 'src/app/config/config';

import Swal from 'sweetalert2'

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(public http: HttpClient, public router: Router, public _uploadFileService: UploadFileService) {
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

  updateUser(user: User) {
    let url = URL_SERVICES + "/user/" + user._id + "?token=" + this.token;

    return this.http.put(url, user)
      .pipe(map((resp: any) => {

        if (user._id === this.user._id) {
          let userDB: User = resp.user;
          this.saveStorage(userDB._id, this.token, userDB);
        }

        Swal.fire('Usuario Actualizado', user.name, 'success');
        return true;
      }));
  }


  changeImage(file: File, id: string) {
    this._uploadFileService.uploadFile(file, 'users', id)
      .then((resp: any) => {
        this.user.img = resp.user.img;
        Swal.fire('Imagen actualizada', this.user.name, 'success');
        this.saveStorage(id, this.token, this.user)
      }).catch(err => {
        console.log(err)
      });
  }

  loadUsers(from: number = 0) {

    let url = URL_SERVICES + '/user?from=' + from;

    return this.http.get(url);

  }

  searchUser(term: string) {

    let url = URL_SERVICES + '/search/collection/users/' + term;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.users));
  }

  removeUser(id: string) {
    let url = URL_SERVICES + '/user/' + id + '?token=' + this.token;

    return this.http.delete(url)
      .pipe(map(() => {
        Swal.fire(
          'Usuario borrado!',
          'El usuario a sido borrado.',
          'success'
        );
        return true;
      }));;
  }


}
