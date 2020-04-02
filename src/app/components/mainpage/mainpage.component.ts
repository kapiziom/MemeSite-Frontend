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
              private router: Router,
              private categoryService: CategoryService,
              private voteService: VoteService,
              private toastr: ToastrService) { 
    this.config = {
      currentPage: 1,
      itemsPerPage: 1,
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
        this.memeList = res['memeList'];
        this.config.totalItems = this.pagecount*this.config.itemsPerPage;
        console.log(this.memeList);
      },
      err =>{
        console.log(err);
      },
    );
  }

  onPlus(memeId: number, i: number){
    this.voteService.SendVote(1, memeId).subscribe(
      (res:any) => {
        this.refreshRate(memeId, i);
          this.toastr.success('voted successful', 'success');
      },
      err => {
        console.log(err);
        this.refreshRate(memeId, i);
        this.toastr.error('you have been voted for this option', 'not success');
      }
    );
  }

  onMinus(memeId: number, i: number){
    this.voteService.SendVote(-1, memeId).subscribe(
      (res:any) => {
        this.refreshRate(memeId, i);
          this.toastr.success('voted successful', 'success');
      },
      err => {
        console.log(err);
        this.refreshRate(memeId, i);
        this.toastr.error('you have been voted for this option', 'not success');
      }
    );
  }

  refreshRate(memeId : number, i: number){
    this.voteService.getMemeRate(memeId).subscribe(
      (res : any) =>{
        this.memeList[i]['rate'] = res;
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
