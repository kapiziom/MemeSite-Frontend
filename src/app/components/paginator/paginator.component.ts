import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() pageNumber: any;
  @Input() pageCount: any;

  routewithoutPage : string = null;
  config: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 2,
      totalItems:0
      };
  }

  ngOnInit(): void {
    this.routewithoutPage = '/' + this.activatedRoute.snapshot.url[0].path;
    for (var _i = 1; _i < this.activatedRoute.snapshot.url.length-1; _i++) {
      this.routewithoutPage = this.routewithoutPage + '/' + this.activatedRoute.snapshot.url[_i].path;
    }
  }

  pageChange(newPage){
    if(newPage == 'first'){
      this.router.navigateByUrl(this.routewithoutPage+ '/' +'1')
        .then(() => {
          window.location.reload();
        });
    }
    if(newPage == 'prev'){
      var numberValue = Number(this.pageNumber);
      numberValue -= 1;
      this.router.navigateByUrl(this.routewithoutPage+ '/' +numberValue)
        .then(() => {
          window.location.reload();
        });
    }
    if(newPage == 'next'){
      var numberValue = Number(this.pageNumber);
      numberValue += 1;
      this.router.navigateByUrl(this.routewithoutPage+ '/' +numberValue)
        .then(() => {
          window.location.reload();
        });
    }
    if(newPage == 'last'){
      this.router.navigateByUrl(this.routewithoutPage+ '/' +this.pageCount)
        .then(() => {
          window.location.reload();
        });
    }
  }

}
