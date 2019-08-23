import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      subMenu:[
        {title:'Dashboard',url:'/dashboard'},
        {title:'ProgressBar',url:'/progress'},
        {title:'Graficas',url:'/graficas1'},
        {title:'Promesas',url:'/promesas'},
        {title:'Rxjs',url:'/rxjs'}
      ]
    },
    {
      title:'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      subMenu:[
        {title:'Usuarios',url:'/usuarios'},
        {title:'Hospitales',url:'/hospitales'},
        {title:'Médicos',url:'/medicos'}
      ]

    }
  ];

  constructor() { }
}
