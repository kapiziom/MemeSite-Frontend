import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr:ToastrService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.router.navigateByUrl('/main/1');
    }
    this.service.registerModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) => {
        if(res.succeeded){
          this.service.registerModel.reset();
          this.toastr.success('New user registered', 'Registration successful');
          this.router.navigateByUrl('/user/login');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('username is already taken', 'Registration failed')
                break;
              case 'DuplicateEmail':
                this.toastr.error('email is already in use', 'Registration failed')
                break;
              default:
                this.toastr.error(element.description, 'Registration failed')
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
