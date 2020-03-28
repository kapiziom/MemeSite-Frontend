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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
