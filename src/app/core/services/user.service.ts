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
      var userRole = payLoad.role;
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

  getUserName(){
    if(this.IsLoggedIn() == true){
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var userName = payLoad.userName;
      return userName;
     }
  }

  CheckRoleStaff(){
    var userRole = null;
     if(this.IsLoggedIn() == true){
       var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
       var userRole = payLoad.role;
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
