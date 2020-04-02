import { Component, OnInit } from '@angular/core';
import { MemeService } from 'src/app/core/services/meme.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { VoteService } from 'src/app/core/services/vote.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  thenum = this.router.url.match(/\d+/)[0];
  MemeID = +this.thenum;
  memeDetails;
  categories;
  comments;
  commentValue: string;

  constructor(private memeService: MemeService,
    private categoryService: CategoryService,
    private voteService: VoteService,
    private router: Router,
    private toastr: ToastrService,
    public userService: UserService,
    public commentService: CommentService) { }

  ngOnInit(): void {
    this.getMeme(this.MemeID);
    this.getComments(this.MemeID);
  }

  getMeme(MemeID){
    this.memeService.GetMemeDetail(MemeID).subscribe(
      (res : any) =>{
        this.memeDetails = res;
      },
      err =>{
        console.log(err);
      },
    );
  }

  getComments(meme_id){
    this.commentService.getComments(meme_id).subscribe(
      (res : any) =>{
        this.comments = res;
      },
      err =>{
        console.log(err);
      },
    );
  }

  OnSubmit(){
    this.commentService.postComment(this.MemeID).subscribe(
      (res:any) => {
        this.commentService.addComment.reset();
        this.toastr.success('New comment added', 'success');
      },
      err => {
        console.log(err);
        this.toastr.error('New comment didnt add', 'not success');
      }
    );
  }

  OnReply(){

  }

  OnReport(){

  }

  OnVote(memeId: number, isVoted: boolean, voteValue: number){
    if(isVoted === true){
      this.voteService.ChangeVote(voteValue, memeId).subscribe(
        (res:any) => {
          this.refreshRate(memeId);
          this.memeDetails['voteValue'] = voteValue;
          this.toastr.success('voted successful', 'success');
        },
        err => {
          console.log(err);
          this.refreshRate(memeId);
          this.toastr.error('you have been voted for this option', 'not success');
        }
      );
    }
    else {
      this.voteService.SendVote(voteValue, memeId).subscribe(
        (res:any) => {
          this.refreshRate(memeId);
          this.memeDetails['voteValue'] = voteValue;
          this.toastr.success('voted successful', 'success');
        },
        err => {
          console.log(err);
          this.refreshRate(memeId);
          this.toastr.error('something went wrong', 'not success');
        }
      );
    }

  }

  refreshRate(memeId : number){
    this.voteService.getMemeRate(memeId).subscribe(
      (res : any) =>{
        this.memeDetails['rate'] = res;
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
