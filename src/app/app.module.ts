import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './core/services/user.service';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { HeaderComponent } from './components/nav/header/header.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { DetailsComponent } from './components/details/details.component';
import { UnacceptedComponent } from './components/unaccepted/unaccepted.component';
import { UploadComponent } from './components/upload/upload.component';
import { UserComponent } from './components/user/user.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { MemeService } from './core/services/meme.service';
import { CategoryService } from './core/services/category.service';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ByCategoryComponent } from './components/by-category/by-category.component';
import { CheckUserComponent } from './components/check-user/check-user.component';
import { VoteService } from './core/services/vote.service';
import { CategoriesComponent } from './components/categories/categories.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CommentService } from './core/services/comment.service';
import { VoteComponent } from './components/vote_buttons/vote.component';
import { ProfileService } from './core/services/profile.service';
import { UsersCommentsComponent } from './components/check-user/users-comments/users-comments.component';
import { UsersContentComponent } from './components/check-user/users-content/users-content.component';
import { EditMemeComponent } from './components/edit-meme/edit-meme.component';
import { AccSettingsComponent } from './components/acc-settings/acc-settings.component';
import { ChangeEmailComponent } from './components/acc-settings/change-email/change-email.component';
import { ChangePasswordComponent } from './components/acc-settings/change-password/change-password.component';
import { ListUsersComponent } from './components/admin-panel/list-users/list-users.component';
import { MenageCategoriesComponent } from './components/admin-panel/menage-categories/menage-categories.component';
import { AddCategoryComponent } from './components/admin-panel/menage-categories/add-category/add-category.component';
import { GroupEditCategoryComponent } from './components/admin-panel/menage-categories/group-edit-category/group-edit-category.component';
import { CurrentUserStatsComponent } from './components/current-user-stats/current-user-stats.component';
import { FavouritesComponent } from './components/check-user/favourites/favourites.component';
import { AddFavouriteComponent } from './components/add-favourite/add-favourite.component';
@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    HeaderComponent,
    ForbiddenComponent,
    DetailsComponent,
    UnacceptedComponent,
    UploadComponent,
    UserComponent,
    AdminPanelComponent,
    RegistrationComponent,
    LoginComponent,
    NotFoundComponent,
    ByCategoryComponent,
    CheckUserComponent,
    CategoriesComponent,
    PaginatorComponent,
    VoteComponent,
    UsersCommentsComponent,
    UsersContentComponent,
    EditMemeComponent,
    AccSettingsComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    ListUsersComponent,
    MenageCategoriesComponent,
    AddCategoryComponent,
    GroupEditCategoryComponent,
    CurrentUserStatsComponent,
    FavouritesComponent,
    AddFavouriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
      closeOnOutsideClick: true,
      popoverClass: 'CustomPopover',
    }),
    ToastrModule.forRoot({
      progressBar: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    FormsModule
  ],
  providers: [
    UserService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MemeService,
    CategoryService,
    VoteService,
    CommentService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
