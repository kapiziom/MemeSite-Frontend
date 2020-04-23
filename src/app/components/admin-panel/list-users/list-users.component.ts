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
  
  constructor(private router: Router,
    public userService: UserService,
    private profileService: ProfileService,
    private toastr: ToastrService) {
      this.config = {
        currentPage: 1,
        itemsPerPage: 20,
        totalItems:0
        };
     }

  ngOnInit(): void {
    this.getUserContentOnInit(this.PageNumber);
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

}
