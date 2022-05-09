import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntityManagementComponent } from './entity-management/entity-management.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainModuleChooseComponent } from './main-module-choose/main-module-choose.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
import { UserGroupManagementComponent } from './user-group-management/user-group-management.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MainModuleChooseComponent
      },
      {
        path: 'entity',
        component: EntityManagementComponent
      },
      {
        path: 'user-group-management',
        component: UserGroupManagementComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
