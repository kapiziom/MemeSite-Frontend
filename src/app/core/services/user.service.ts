import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }

  readonly BaseURI = 'https://localhost:44312/api';

  registerModel = this.fb.group({
    UserName :['',[Validators.required,Validators.minLength(3),Validators.maxLength(16)]],
    Email :['',[Validators.required,Validators.email]],
    Passwords : this.fb.group({
      Password :['',[Validators.required,Validators.minLength(6)]],
      ConfirmPassword :['',Validators.required],
    },{validator : this.comparePasswords })
  });

  ChangePassword = this.fb.group({
    CurrentPassword :['', [Validators.required]],
    Passwords : this.fb.group({
      Password :['',[Validators.required,Validators.minLength(6)]],
      ConfirmPassword :['',Validators.required],
    },{validator : this.comparePasswords })   
  });

  comparePasswords(fb:FormGroup){
    let confirmPasswordControl = fb.get('ConfirmPassword');
    if(confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors){
      if( fb.get('Password').value != confirmPasswordControl.value )
        confirmPasswordControl.setErrors({ passwordMismatch: true })
      else
        confirmPasswordControl.setErrors(null);
    }
  }

  register(){
    var body = {
      UserName: this.registerModel.value.UserName,
      Email: this.registerModel.value.Email,
      Password: this.registerModel.value.Passwords.Password,
      ConfirmPassword: this.registerModel.value.Passwords.ConfirmPassword,
    };
    return this.http.post(this.BaseURI+'/Account/Register',body);
  }

  login(formData){
    return this.http.post(this.BaseURI+'/Account/Login',formData);
  }

  changeUserName(formData){
    return this.http.put(this.BaseURI+'/Account/ChangeUserName',formData);
  }

  changeEmail(formData){
    return this.http.put(this.BaseURI+'/Account/ChangeEmail',formData);
  }

  changePassword(){
    var body = {
      OldPassword: this.ChangePassword.value.CurrentPassword,
      NewPassword: this.ChangePassword.value.Passwords.Password,
      ConfirmPassword: this.ChangePassword.value.Passwords.ConfirmPassword,
    };
    return this.http.put(this.BaseURI+'/Account/ChangePassword', body);
  }

  

  IsLoggedIn(): boolean{
    if(localStorage.getItem('token') != null){
      return true;
    }
    else {
      return false;
    }
  }

  getRole(){
    if(this.IsLoggedIn() == true){
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var userRole = payLoad.userRole;
      return userRole;
    }
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRole = this.getRole();
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  getUserId(){
    if(this.IsLoggedIn() == true){
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var userId = payLoad.UserID;
      return userId;
     }
  }

  getUsernameEmail(){
    return this.http.get(this.BaseURI+'/Account/UsernameEmail');
  }

  getUserName(){
    if(this.IsLoggedIn() == true){
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var userName = payLoad.userName;
      return userName;
     }
  }

  setUserName(newUsername: string){
    if(this.IsLoggedIn() == true){
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      payLoad.userName = newUsername;
     }
  }

  CheckRoleStaff(){
    var userRole = null;
     if(this.IsLoggedIn() == true){
       var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
       var userRole = payLoad.userRole;
       if(userRole == 'Administrator'){
         return 'Administrator';
       }
      if(userRole == 'NormalUser'){
        return false;
      }
     }
     else{
       return false;
     }
  }


}
