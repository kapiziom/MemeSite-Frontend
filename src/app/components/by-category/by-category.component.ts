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
                  itemsPerPage: 1,
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
    console.log(this.category);
  }

  getContent(pageNumber){
    this.memeService.getCategoryPagedContent(this.category, pageNumber, this.config.itemsPerPage).subscribe(
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

  pageChange(newPage){
    if(newPage == 'first'){
      this.router.navigateByUrl('/category/'+this.category+'/1')
        .then(() => {
          window.location.reload();
        });
    }
    if(newPage == 'prev'){
      var numberValue = Number(this.PageNumber);
      numberValue -= 1;
      this.router.navigateByUrl('/category/'+this.category+'/'+numberValue)
        .then(() => {
          window.location.reload();
        });
    }
    if(newPage == 'next'){
      var numberValue = Number(this.PageNumber);
      numberValue += 1;
      this.router.navigateByUrl('/category/'+this.category+'/'+numberValue)
        .then(() => {
          window.location.reload();
        });
    }
    if(newPage == 'last'){
      this.router.navigateByUrl('/category/'+this.category+'/'+this.pagecount)
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
