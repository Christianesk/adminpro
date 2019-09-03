import { Component, OnInit } from '@angular/core';
import { HospitalsService, DoctorService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { NgForm } from '@angular/forms';
import { Doctor } from 'src/app/models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {



  hospitals: Hospital[] = [];
  doctor: Doctor = new Doctor('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public _hospitalService: HospitalsService, public _doctorService: DoctorService, public router: Router, public activatedRoute: ActivatedRoute, public _modalUploadService: ModalUploadService) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.loadDoctorById(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService.loadHospitalsforSelect()
      .subscribe((resp: any) => {
        this.hospitals = resp.hospitals;
      });
    this._modalUploadService.notification
      .subscribe(resp => {
        this.doctor.img = resp.doctor.img;
      });
  }

  saveDoctor(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this._doctorService.saveDoctor(this.doctor)
      .subscribe(doctor => {

        this.doctor._id = doctor._id;
        this.router.navigate(['/medico', doctor._id]);
      });
  }

  changeHospital(id: string) {
    this._hospitalService.findByIdHospital(id)
      .subscribe(hospital => this.hospital = hospital);
  }

  loadDoctorById(id: string) {
    this._doctorService.loadDoctorById(id)
      .subscribe(doctor => {
        this.doctor = doctor;
        this.doctor.hospital = doctor.hospital._id;
        this.changeHospital(doctor.hospital);
      });
  }

  changePhoto() {
    this._modalUploadService.showModal('doctors', this.doctor._id);
  }
  


}
