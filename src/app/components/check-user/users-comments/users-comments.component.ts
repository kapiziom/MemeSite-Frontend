import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/core/services/comment.service';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-comments',
  templateUrl: './users-comments.component.html',
  styleUrls: ['./users-comments.component.css']
})
export class UsersCommentsComponent implements OnInit {

  userName: string;
  src: string;
  stats: any;
  config: any;
  commentList = new Array<any>();
  pagecount;
  canLoadMoreContent: boolean = true;
  
  isDelete: number = null;

  constructor(private router: Router,
    public userService: UserService,
    private commentService: CommentService,
    private toastr: ToastrService) {
      this.config = {
        currentPage: 1,
        itemsPerPage: 2,
        totalItems:0
        };
     }

     ngOnInit(): void {
      this.getUserName();
      this.getUserContentOnInit();
    }
  
    getUserName(){
      this.src = this.router.url;
      const route = this.src.split('/');
      this.userName = route[2];
    }
  
    getUserContentOnInit(){
      this.commentService.GetUserComments(this.userName, this.config.currentPage, this.config.itemsPerPage).subscribe(
        (res : any) =>{
          this.pagecount = res['pageCount'];
          this.commentList = res['items'];
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
      this.commentService.GetUserComments(this.userName, this.config.currentPage, this.config.itemsPerPage).subscribe(
        (res : any) =>{
          res['items'].forEach(element => {
            this.commentList.push(element);
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

    CancelDelete(){
      this.isDelete = null;
    }
  
    BeforeDelete(i){
      if(this.isDelete != i){
        this.isDelete = i;
      }
      else this.isDelete = null;
    }
  
    OnDelete(i, commentId){
      this.commentService.deleteComment(commentId).subscribe(
        (res:any) => {
          this.isDelete = null;
          this.commentList.splice(i, 1);
          this.toastr.success('comment deleted', 'success');
        },
        err => {
          console.log(err);
          this.toastr.error('comment didnt delete', 'not success');
        }
      );
    }

}
