import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { MemeService } from 'src/app/core/services/meme.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VoteService } from 'src/app/core/services/vote.service';
import { max } from 'rxjs/operators';

@Component({
  selector: 'app-unaccepted',
  templateUrl: './unaccepted.component.html',
  styleUrls: ['./unaccepted.component.css']
})
export class UnacceptedComponent implements OnInit {

  config: any;
  memeList = new Array<any>();
  pagecount;
  categories;

  isDelete: number = null;

  PageNumber = this.router.url.match(/\d+/)[0];

  constructor(public userService: UserService,
              private memeService: MemeService,
              private router: Router,
              private voteService: VoteService,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) { 
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
    this.memeService.getUnacceptedContent(pageNumber, this.config.itemsPerPage).subscribe(
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


}
