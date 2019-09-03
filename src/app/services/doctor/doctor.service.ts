import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import Swal from 'sweetalert2';
import { Doctor } from 'src/app/models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(public http: HttpClient, public _userService: UserService) { }


  loadDoctors(from: number = 0) {

    let url = URL_SERVICES + '/doctor?from=' + from;

    return this.http.get(url);

  }

  searchDoctors(term: string) {

    let url = URL_SERVICES + '/search/collection/doctors/' + term;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.doctors));
  }

  removeDoctor(id: string) {
    let url = URL_SERVICES + '/doctor/' + id + '?token=' + this._userService.token;

    return this.http.delete(url)
      .pipe(map(() => {
        Swal.fire(
          'Médico borrado!',
          'El médico a sido borrado.',
          'success'
        );
        return true;
      }));
  }

  saveDoctor(doctor: Doctor) {

    let url = URL_SERVICES + '/doctor';


    if (doctor._id) {
      //Updating Doctor
      url += '/' + doctor._id;
      url += '?token=' + this._userService.token

      return this.http.put(url, doctor)
        .pipe(map((resp: any) => {
          Swal.fire('Médico Actualizado!', doctor.name, 'success');
          return resp.doctor;
        }));

    } else {

      //Creating Doctor
      url += '?token=' + this._userService.token
      return this.http.post(url, doctor)
        .pipe(map((resp: any) => {
          Swal.fire('Médico creado!', doctor.name, 'success');
          return resp.doctor;
        }));
    }


  }

  loadDoctorById(id: string) {
    let url = URL_SERVICES + '/doctor/' + id;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.doctor));
  }
}
