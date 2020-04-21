import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  formModel = {
    newEmail: ''
  }

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.service.changeEmail(form.value).subscribe(
      (res:any) => {
        if(res.succeeded){
          this.toastr.success('Change email successful');
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              default:
                this.toastr.error(element.description, 'Change email failed')
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
