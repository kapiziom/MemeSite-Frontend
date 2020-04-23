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

  onProfile(){
    const route = this.router.url.split('/');
    if(route[1] == "profile"){
      this.router.navigateByUrl('/profile/'+ this.service.getUserName()).then(() => {
        window.location.reload();
      });
    }
    else {
      this.router.navigateByUrl('/profile/'+ this.service.getUserName());
    }
  }

  SignIn(){
    this.router.navigateByUrl('/user/login');
  }
  SignUp(){
    this.router.navigateByUrl('/user/registration');
  }

  
}
