import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemeService } from 'src/app/core/services/meme.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { UserService } from 'src/app/core/services/user.service';


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
              private categoryService: CategoryService) { 
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
        console.log(this.pagecount);
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

  onPlus(number: number){
    console.log(number);
    console.log('plus works');
    console.log(this.thenum);
  }

  onMinus(number: number){
    console.log(number);
    console.log('minus works');
  }

  addFavourite(number: number){
    console.log(number);
    console.log('addfavourite works');
  }

}
