import { Component, OnInit } from '@angular/core';
import { DoctorService, HospitalsService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Doctor } from 'src/app/models/doctor.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = [];
  from: number = 0;
  totalRecords: number = 0;
  loading: boolean = true;

  constructor(public _doctorService: DoctorService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.loadDoctors();
    this._modalUploadService.notification.subscribe(resp => this.loadDoctors());
  }

  viewModal(id: string) {
    this._modalUploadService.showModal('doctors', id);
  }

  loadDoctors() {

    this.loading = true;

    this._doctorService.loadDoctors(this.from)
      .subscribe((resp: any) => {
        this.totalRecords = resp.total;
        this.doctors = resp.doctors;
        this.loading = false;
      });

  }

  searchDoctor(term: string) {

    if (term.length <= 0) {
      this.loadDoctors();
      return;
    }

    this.loading = true;

    this._doctorService.searchDoctors(term)
      .subscribe((doctors: Doctor[]) => {
        this.doctors = doctors;
        this.loading = false;
      });
  }

  removeDoctor(doctor: Doctor) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta a punto de borrar a ' + doctor.name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then(result => {
      if (result.value) {
        this._doctorService.removeDoctor(doctor._id)
          .subscribe(() => {
            this.loadDoctors();
          });

      }
    });
  }

  changeFrom(valor: number) {

    let from = this.from + valor;

    if (from >= this.totalRecords) {
      return;
    }

    if (from < 0) {
      return;
    }

    this.from += valor;
    this.loadDoctors();

  }

}
