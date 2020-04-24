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
import { AuthGuard } from './core/auth/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ByCategoryComponent } from './components/by-category/by-category.component';
import { CheckUserComponent } from './components/check-user/check-user.component';
import { EditMemeComponent } from './components/edit-meme/edit-meme.component';
import { AccSettingsComponent } from './components/acc-settings/acc-settings.component';
import { ChangeEmailComponent } from './components/acc-settings/change-email/change-email.component';
import { ChangePasswordComponent } from './components/acc-settings/change-password/change-password.component';
import { ListUsersComponent } from './components/admin-panel/list-users/list-users.component';
import { MenageCategoriesComponent } from './components/admin-panel/menage-categories/menage-categories.component';
import { AddCategoryComponent } from './components/admin-panel/menage-categories/add-category/add-category.component';
import { GroupEditCategoryComponent } from './components/admin-panel/menage-categories/group-edit-category/group-edit-category.component';
import { UsersContentComponent } from './components/check-user/users-content/users-content.component';
import { UsersCommentsComponent } from './components/check-user/users-comments/users-comments.component';
import { FavouritesComponent } from './components/check-user/favourites/favourites.component';


const routes: Routes = [
  {path: 'main/:id' , component: MainpageComponent },
  {path: 'category/:name/:id' , component: ByCategoryComponent },
  {path: '404' , component: NotFoundComponent },
  {path: 'unaccepted/:id' , component: UnacceptedComponent },
  {path: 'details/:id' , component: DetailsComponent },
  {path: 'upload', component: UploadComponent, canActivate:[AuthGuard], data: {permittedRoles:['NormalUser', 'Administrator']} },
  {path: 'edit/:id', component: EditMemeComponent, canActivate:[AuthGuard], data: {permittedRoles:['NormalUser', 'Administrator']} },
  {path: 'adminpanel', component: AdminPanelComponent, canActivate:[AuthGuard], data: {permittedRoles:['Administrator']}, children: [
    {path: 'users/:page', component: ListUsersComponent },
    {path: 'menagecategories', component: MenageCategoriesComponent, children: [
      {path: 'addcategory', component: AddCategoryComponent },
      {path: 'categories', component: GroupEditCategoryComponent, }
    ]},
  ]},
  {path: 'profile/:username' , component: CheckUserComponent, children: [
    {path: 'memes', component: UsersContentComponent },
    {path: 'comments', component: UsersCommentsComponent},
    {path: 'favourites', component: FavouritesComponent}
  ]},
  {path: 'user', component: UserComponent,
  children: [
    {path: 'registration', component: RegistrationComponent },
    {path: 'login', component: LoginComponent}
  ]},
  {path: 'settings', component: AccSettingsComponent, canActivate:[AuthGuard],
  children: [
    {path: 'email', component: ChangeEmailComponent},
    {path: 'password', component: ChangePasswordComponent},
  ]},
  {path: 'forbidden', component: ForbiddenComponent },
  {path: '' , redirectTo:'/main/1', pathMatch:'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
