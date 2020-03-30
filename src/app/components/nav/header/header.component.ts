import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AuthGuard } from '../../../core/auth/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  userDetails;

  constructor(private router:Router, public service:UserService) { }

  ngOnInit() {
   
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/main/1');
  }

  SignIn(){
    this.router.navigateByUrl('/user/login');
  }
  SignUp(){
    this.router.navigateByUrl('/user/registration');
  }

  
}
