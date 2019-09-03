import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';
import Swal from 'sweetalert2'
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalsService {

  public hospital: Hospital;

  constructor(public http: HttpClient, public router: Router, public _userService: UserService) {
  }

  loadHospitalsforSelect(){
    let url = URL_SERVICES + '/hospital';

    return this.http.get(url);
  }

  loadHospitals(from: number = 0) {

    let url = URL_SERVICES + '/hospital?from=' + from;

    return this.http.get(url);

  }

  findByIdHospital(id: string) {
    let url = URL_SERVICES + '/hospital/' + id + '?token=' + this._userService.token;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.hospital));;
  }

  searchHospital(term: string) {

    let url = URL_SERVICES + '/search/collection/hospitals/' + term;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.hospitals));
  }

  removeHospital(id: string) {
    let url = URL_SERVICES + '/hospital/' + id + '?token=' + this._userService.token;

    return this.http.delete(url)
      .pipe(map(() => {
        Swal.fire(
          'Hospital borrado!',
          'El hospital a sido borrado.',
          'success'
        );
        return true;
      }));;
  }

  createHospital(name: string) {
    let url = URL_SERVICES + '/hospital?token=' + this._userService.token;

    return this.http.post(url, { name })
      .pipe(map((resp: any) => resp.hospital));
  }

  updateHospital(hospital: Hospital) {
    let url = URL_SERVICES + "/hospital/" + hospital._id + "?token=" + this._userService.token;

    return this.http.put(url, hospital)
      .pipe(map((resp: any) => {
        Swal.fire('Hospital Actualizado', hospital.name, 'success');
        return true;
      }));
  }
}
