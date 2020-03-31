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
  collection = [];
  memeList = new Array<any>();
  pagecount;
  categories;

  thenum = this.router.url.match(/\d+/)[0];
  num = +this.thenum;

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
    this.getContent(this.thenum);
    this.GetCategories();
  }

  getContent(pageNumber){
    this.memeService.getPagedContent(pageNumber).subscribe(
      (res : any) =>{
        this.pagecount = res['pageCount'];
        if(this.thenum > this.pagecount){
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

  GetCategories(){
    this.categoryService.getCategories().subscribe(
      (res : any) =>{
        this.categories = res;
      },
      err =>{
        console.log(err);
      },
    );
  }

  pageChange(newPage){
    if(newPage == 'first'){
      this.router.navigateByUrl('/main/'+'1')
        .then(() => {
          window.location.reload();
        });
    }
    if(newPage == 'prev'){
      var numberValue = Number(this.thenum);
      numberValue -= 1;
      this.router.navigateByUrl('/main/'+numberValue)
        .then(() => {
          window.location.reload();
        });
    }
    if(newPage == 'next'){
      var numberValue = Number(this.thenum);
      numberValue += 1;
      this.router.navigateByUrl('/main/'+numberValue)
        .then(() => {
          window.location.reload();
        });
    }
    if(newPage == 'last'){
      this.router.navigateByUrl('/main/'+this.pagecount)
        .then(() => {
          window.location.reload();
        });
    }
    
    
  }

  onPlus(memeId: number, i: number){
    console.log(i);
    console.log(this.memeList[0]);
    this.voteService.send(1, memeId).subscribe(
      (res:any) => {
          this.toastr.success('voted successful', 'success');
          this.afterVote(memeId, i)
      },
      err => {
        console.log(err);
        this.toastr.error('you have been voted for this option', 'not success');
      }
    );
  }

  onMinus(memeId: number, i: number){
    this.voteService.send(-1, memeId).subscribe(
      (res:any) => {
          this.toastr.success('voted successful', 'success');
          this.afterVote(memeId, i)
      },
      err => {
        console.log(err);
        this.toastr.error('you have been voted for this option', 'not success');
      }
    );
  }

  afterVote(memeId : number, i: number){
    this.memeService.getMemeRate(memeId).subscribe(
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
