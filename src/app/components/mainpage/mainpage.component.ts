import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemeService } from 'src/app/core/services/meme.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { UserService } from 'src/app/core/services/user.service';
import { VoteService } from 'src/app/core/services/vote.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  config: any;
  memeList = new Array<any>();
  pagecount;
  categories;

  isDelete: number = null;

  PageNumber = this.router.url.match(/\d+/)[0];

  constructor(public userService: UserService,
              private memeService: MemeService,
              private router: Router,
              private toastr: ToastrService) { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 2,
      totalItems:0
      };
  }

  ngOnInit(): void {
    this.getContent(this.PageNumber);
  }

  getContent(pageNumber){
    this.memeService.getPagedContent(pageNumber, this.config.itemsPerPage).subscribe(
      (res : any) =>{
        this.pagecount = res['pageCount'];
        if(this.PageNumber > this.pagecount){
          this.router.navigateByUrl('/404');
        }
        this.memeList = res['items'];
        this.config.totalItems = this.pagecount*this.config.itemsPerPage;
      },
      err =>{
        console.log(err);
      },
    );
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

  addFavourite(number: number){
    console.log('addfavourite works');
  }

}
