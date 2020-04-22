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

  PageNumber = this.router.url.match(/\d+/)[0];

  constructor(public userService: UserService,
              private memeService: MemeService,
              private router: Router) { 
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
        console.log(res);
        this.pagecount = res['pageCount'];
        if(this.PageNumber > this.pagecount){
          this.router.navigateByUrl('/404');
        }
        this.memeList = res['items'];
        console.log(this.pagecount);
        console.log(this.memeList);
        this.config.totalItems = this.pagecount*this.config.itemsPerPage;
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
