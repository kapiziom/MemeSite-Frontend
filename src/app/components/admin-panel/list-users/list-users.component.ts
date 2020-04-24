import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  config: any;
  usersList = new Array<any>();
  pagecount;
  PageNumber = this.router.url.match(/\d+/)[0];
  currentUserName: string;
  isSetRole:number = null;
  status:string = null;
  
  constructor(private router: Router,
    public userService: UserService,
    private profileService: ProfileService,
    private toastr: ToastrService) {
      this.config = {
        currentPage: 1,
        itemsPerPage: 2,
        totalItems:0
        };
     }

  ngOnInit(): void {
    this.getUserContentOnInit(this.PageNumber);
    this.currentUserName = this.userService.getUserName();
  }

  getUserContentOnInit(PageNumber){
    this.profileService.GetUsersForAdmin(PageNumber, this.config.itemsPerPage).subscribe(
      (res : any) =>{
        this.pagecount = res['pageCount'];
        this.usersList = res['items'];
        this.config.totalItems = this.pagecount*this.config.itemsPerPage;
      },
      err =>{
        console.log(err);
      },
    );
  }

  setRole(i, setStatus){
    if(this.isSetRole != i){
      this.isSetRole = i;
      this.status = setStatus;
    }
    else this.CancelSetRole();
  }
  
  CancelSetRole(){
    this.isSetRole = null;
    this.status = null;
  }

  OnBan(i){
    this.isSetRole = null;
    this.status = null;
    this.userService.setRole(this.usersList[i]['userId'], 'Banned').subscribe(
      (res : any) =>{
        console.log(res);
        this.usersList[i]['userRole'] = 'Banned'
        this.toastr.success('user banned');
      },
      err =>{
        console.log(err);
      },
    );
  }

  OnUnban(i){
    this.isSetRole = null;
    this.status = null;
    this.userService.setRole(this.usersList[i]['userId'], 'NormalUser').subscribe(
      (res : any) =>{
        this.usersList[i]['userRole'] = 'NormalUser'
        this.toastr.success('user unbanned');
      },
      err =>{
        console.log(err);
      },
    );
  }

}
