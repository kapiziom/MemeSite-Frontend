import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { MemeService } from 'src/app/core/services/meme.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  userName: string;
  src: string;
  stats: any;
  config: any;
  memeList = new Array<any>();
  pagecount;
  canLoadMoreContent: boolean = true;
  
  isDelete: number = null;

  constructor(private router: Router,
    public userService: UserService,
    private memeService: MemeService,
    private toastr: ToastrService) {
      this.config = {
        currentPage: 1,
        itemsPerPage: 2,
        totalItems:0
        };
     }

     ngOnInit(): void {
      this.getUserName();
      this.checkUser();
      this.getUserContentOnInit();
    }
  
    getUserName(){
      this.src = this.router.url;
      const route = this.src.split('/');
      this.userName = route[2];
    }
  
    checkUser(){
      if(this.userName != this.userService.getUserName()){
        this.router.navigateByUrl('forbidden');
      }
    }
    
    getUserContentOnInit(){
      this.memeService.getFavourites(this.config.currentPage, this.config.itemsPerPage).subscribe(
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
      this.memeService.getFavourites(this.config.currentPage, this.config.itemsPerPage).subscribe(
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
  
    onDelete(i){
      if(this.isDelete != i){
        this.isDelete = i;
      }
      else this.isDelete = null;
    }
    CancelDelete(){
      this.isDelete = null;
    }
  
    OnDeleteMeme(id){
      this.memeService.delete(id).subscribe(
        (res:any) => {
          window.location.reload();
          this.toastr.success('delete successful', 'success');
        },
        err => {
          console.log(err);
          this.toastr.error('something went wrong', 'not success');
        }
      );
    }

}
