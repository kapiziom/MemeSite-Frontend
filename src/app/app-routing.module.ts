import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { UnacceptedComponent } from './components/unaccepted/unaccepted.component';
import { DetailsComponent } from './components/details/details.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UserComponent } from './components/user/user.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { UploadComponent } from './components/upload/upload.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './core/auth/auth.guard';


const routes: Routes = [
  {path: '' , redirectTo:'/main/1', pathMatch:'full' },
  {path: 'main/:id' , component: MainpageComponent },
  {path: 'unaccepted/:id' , component: UnacceptedComponent },
  {path: 'details/:id' , component: DetailsComponent },
  {path: 'upload', component: UploadComponent, canActivate:[AuthGuard] },
  {path: 'adminpanel', component: AdminPanelComponent, canActivate:[AuthGuard], data: {permittedRoles:['Administrator']} },
  {path: 'profile', component: UserProfileComponent, canActivate:[AuthGuard] },
  {path: 'user', component: UserComponent,
  children: [
    {path: 'registration', component: RegistrationComponent },
    {path: 'login', component: LoginComponent}
  ]},
  {path: 'forbidden', component: ForbiddenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
