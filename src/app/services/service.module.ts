import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SidebarService, SharedService, UserService } from "./service.index";
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './guards/login.guard';
import { UploadFileService } from './upload-file/upload-file.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SettingsService, 
    SidebarService, 
    SharedService,
    UserService,
    LoginGuard,
    UploadFileService
  ],
})
export class ServiceModule { }
