import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './core/services/user.service';

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
    UsersContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
