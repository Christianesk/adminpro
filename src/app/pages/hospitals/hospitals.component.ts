import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalsService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  from: number = 0;
  totalRecords: number = 0;
  loading: boolean = true;

  constructor(public _hospitalService: HospitalsService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.loadHospitals();
    this._modalUploadService.notification.subscribe(resp => this.loadHospitals());
  }

  viewModal(id: string) {
    this._modalUploadService.showModal('hospitals', id);
  }

  loadHospitals() {

    this.loading = true;

    this._hospitalService.loadHospitals(this.from)
      .subscribe((resp: any) => {
        this.totalRecords = resp.total;
        this.hospitals = resp.hospitals;
        this.loading = false;
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
    this.loadHospitals();

  }

  searchHospital(term: string) {

    if (term.length <= 0) {
      this.loadHospitals();
      return;
    }

    this.loading = true;

    this._hospitalService.searchHospital(term)
      .subscribe((hospitals: Hospital[]) => {
        this.hospitals = hospitals;
        this.loading = false;
      });
  }

  removeHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta a punto de borrar a ' + hospital.name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then(result => {
      if (result.value) {
        this._hospitalService.removeHospital(hospital._id)
          .subscribe(() => {
            this.loadHospitals();
          });

      }
    });
  }

  saveHospital(hospital: Hospital) {
    this._hospitalService.updateHospital(hospital).subscribe();
  }

  createHospital() {
    Swal.fire({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      type: 'info',
      input: 'text',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="fa fa-save"></i>  Guardar'

    }).then(result => {
      if (!result || result.value.length == 0) {
        return;
      }
      this._hospitalService.createHospital(result.value)
        .subscribe(() => {
          this.loadHospitals();
        });
    });
  }

}
