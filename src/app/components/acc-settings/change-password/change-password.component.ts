import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public service: UserService, private toastr:ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.service.ChangePassword.reset();
  }

  onSubmit(){
    this.service.changePassword().subscribe(
      (res:any) => {
        if(res.succeeded){
          this.service.ChangePassword.reset();
          this.toastr.success('New password', 'password change successful');
        } else {
            res.errors.forEach(element => {
            switch (element.code) {
                case 'PasswordMismatch':
                  this.toastr.error('wrong current password', 'password change failed')
                  break;
                default:
                  this.toastr.error('wrong password', 'password change failed')
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
