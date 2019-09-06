import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard, AdminGuard, VerifyTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { GlobalSearchComponent } from './global-search/global-search.component';


const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [VerifyTokenGuard],
        data: { title: 'Dashboard' }
    },
    { path: 'progress', component: ProgressComponent, canActivate: [VerifyTokenGuard], data: { title: 'Progress' } },
    { path: 'graficas1', component: Graficas1Component, canActivate: [VerifyTokenGuard], data: { title: 'Graficas' } },
    { path: 'promesas', component: PromesasComponent, canActivate: [VerifyTokenGuard], data: { title: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, canActivate: [VerifyTokenGuard], data: { title: 'RxJs' } },
    { path: 'account-settings', component: AccountSettingsComponent, canActivate: [VerifyTokenGuard], data: { title: 'Ajustes del Tema' } },
    { path: 'profile', component: ProfileComponent, canActivate: [VerifyTokenGuard], data: { title: 'Perfil de Usuario' } },
    { path: 'globalSearch/:term', component: GlobalSearchComponent, canActivate: [VerifyTokenGuard], data: { title: 'Búsqueda Global' } },
    //Mantenimientos
    {
        path: 'usuarios',
        component: UsersComponent,
        canActivate: [AdminGuard, VerifyTokenGuard],
        data: { title: 'Mantenimiento de usuarios' }
    },
    { path: 'hospitales', component: HospitalsComponent, canActivate: [VerifyTokenGuard], data: { title: 'Mantenimiento de hospitales' } },
    { path: 'medicos', component: DoctorsComponent, canActivate: [VerifyTokenGuard], data: { title: 'Mantenimiento de Médicos' } },
    { path: 'medico/:id', component: DoctorComponent, canActivate: [VerifyTokenGuard], data: { title: 'Actualizar Médico' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
