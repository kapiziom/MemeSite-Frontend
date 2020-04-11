import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { MemeService } from 'src/app/core/services/meme.service';
import { ToastrService } from 'ngx-toastr';
import { VoteService } from 'src/app/core/services/vote.service';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-by-category',
  templateUrl: './by-category.component.html',
  styleUrls: ['./by-category.component.css']
})
export class ByCategoryComponent implements OnInit {

  category: string;
  PageNumber = this.router.url.match(/\d+/)[0];
  src: string;
  config: any;
  memeList = new Array<any>();
  pagecount;
  categories;
  

  constructor(private router: Router,
              public userService: UserService,
              private memeService: MemeService,
              private categoryService: CategoryService,
              private voteService: VoteService,
              private toastr: ToastrService) {
                this.config = {
                  currentPage: 1,
                  itemsPerPage: 3,
                  totalItems:0
                  };
              }

  ngOnInit(): void {
    this.getCategoryName();
    this.getContent(this.PageNumber);
  }

  getCategoryName(){
    this.src = this.router.url;
    const route = this.src.split('/');
    this.category = route[2];
  }

  getContent(pageNumber){
    this.memeService.getCategoryPagedContent(this.category, pageNumber, this.config.itemsPerPage).subscribe(
      (res : any) =>{
        this.pagecount = res['pageCount'];
        // if(this.PageNumber > this.pagecount){
        //   this.router.navigateByUrl('/404');
        // }
        this.memeList = res['items'];
        this.config.totalItems = res['totalItems'];
      },
      err =>{
        console.log(err);
      },
    );
  }

  addFavourite(number: number){
    console.log(number);
    console.log('addfavourite works');
  }

}
