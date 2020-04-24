import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-check-user',
  templateUrl: './check-user.component.html',
  styleUrls: ['./check-user.component.css']
})
export class CheckUserComponent implements OnInit {

  userName: string;
  currentUserName: string;
  src: string;
  stats: any;
  config: any;
  memeList = new Array<any>();
  pagecount;
  canLoadMoreContent: boolean = true;

  constructor(private router: Router,
    public userService: UserService,
    private profileService: ProfileService) {
      this.config = {
        currentPage: 1,
        itemsPerPage: 2,
        totalItems:0
        };
     }

  ngOnInit(): void {
    this.getUserName();
    this.getUserStats();
    this.getUserContentOnInit();
    this.currentUserName = this.userService.getUserName();
  }

  getUserName(){
    this.src = this.router.url;
    const route = this.src.split('/');
    this.userName = route[2];
  }

  getUserStats(){
    this.profileService.GetUserStats(this.userName).subscribe(
      (res : any) =>{
        this.stats = res;
      },
      err =>{
        console.log(err);
      },
    );
  }

  getUserContentOnInit(){
    this.profileService.GetUserContent(this.userName, this.config.currentPage, this.config.itemsPerPage).subscribe(
      (res : any) =>{
        this.pagecount = res['pageCount'];
        this.memeList = res['items'];
        this.config.totalItems = this.pagecount*this.config.itemsPerPage;
        this.canLoadMore();
      },
      err =>{
        console.log(err);
      },
    );
  }

  loadMoreContent(){
    this.canLoadMore();
    this.config.currentPage = this.config.currentPage + 1;
    this.profileService.GetUserContent(this.userName, this.config.currentPage, this.config.itemsPerPage).subscribe(
      (res : any) =>{
        res['items'].forEach(element => {
          this.memeList.push(element);
        });
      },
      err =>{
        console.log(err);
      },
    );
    
  }
  
  canLoadMore(){
    if(this.config.currentPage == this.pagecount){
      this.canLoadMoreContent = false;
    }
  }

  GoSettings(){
    this.router.navigateByUrl('/settings');
  }

  addFavourite(memeId: Number){

  }

}
