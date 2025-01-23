import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatToolbar} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatIcon} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import { JobListComponent } from './job-list/job-list.component';
import { UpdateJobComponent } from './update-job/update-job.component';
import { ToastrModule } from 'ngx-toastr'




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatCard,
    MatCardHeader,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatInput,
    MatToolbar,
    BrowserAnimationsModule,
    MatIcon,
    FormsModule,
    HomeComponent,
    MatCardContent,
    MatCardActions,
    JobListComponent,
    HttpClientModule,
    MatCardAvatar,
    UpdateJobComponent,
    MatInputModule,
    MatFormFieldModule,
    MatToolbar,
    ToastrModule.forRoot({
      positionClass: 'toast-center-center'
    }),


  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
