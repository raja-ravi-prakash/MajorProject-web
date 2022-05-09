import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//* 3rd party
import { ToastrModule } from 'ngx-toastr';
//* 3rd party

//* material components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
//* material componets

import { HomeComponent } from './home/home.component';
import { EntityManagementComponent } from './entity-management/entity-management.component';
import { EntityCreationComponent } from './entity-management/entity-creation/entity-creation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RequestInterceptor } from './common/services/http.interceptor';
import { MainModuleChooseComponent } from './main-module-choose/main-module-choose.component';
import { UserGroupManagementComponent } from './user-group-management/user-group-management.component';
import { UserGroupPreviewComponent } from './user-group-management/user-group-preview/user-group-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EntityManagementComponent,
    EntityCreationComponent,
    LoginComponent,
    RegisterComponent,
    MainModuleChooseComponent,
    UserGroupManagementComponent,
    UserGroupPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatRippleModule,
    ToastrModule.forRoot(),
    MatTooltipModule,
    MatSelectModule,
    MatChipsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
