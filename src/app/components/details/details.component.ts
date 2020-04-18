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
  memeDetails: any;
  categories;
  comments;
  commentValue: string;

  isEdit: number = null;

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
//section - meme
  getMeme(MemeID){
    this.memeService.GetMemeDetail(MemeID).subscribe(
      (res : any) =>{
        this.memeDetails = res;
        console.log(this.memeDetails);
      },
      err =>{
        console.log(err);
      },
    );
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
//section comments
  getComments(meme_id){
    this.commentService.getCommentsForMeme(meme_id).subscribe(
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
        this.comments.splice(0, 0, res); 
        this.toastr.success('New comment added', 'success');
      },
      err => {
        console.log(err);
        this.toastr.error('New comment didnt add', 'not success');
      }
    );
  }

  OnEdit(i){
    this.isEdit = i;
    this.commentService.editComment.setValue({
      txt : this.comments[i]['txt'],
    });
    console.log(this.commentService.editComment.value.txt);
    console.log(i);
  }

  SaveEdit(i, commentId){
    if(this.commentService.editComment.value.txt ==  this.comments[i]['txt']){
      this.toastr.error('There is no changes', 'not success');
      this.commentService.editComment.reset();
      this.isEdit = null;
    }
    else{
      this.commentService.putComment(commentId).subscribe(
        (res:any) => {
          this.isEdit = null;
          this.comments[i] = res;
          this.commentService.editComment.reset();
          this.toastr.success('comment edited', 'success');
        },
        err => {
          console.log(err);
          this.isEdit = null;
          this.commentService.editComment.reset();
          this.toastr.error('comment didnt edit', 'not success');
        }
      );
    }
  }

  CancelEdit(){
    this.commentService.editComment.reset();
    this.isEdit = null;
  }

  OnDelete(i, commentId){
    this.commentService.deleteComment(commentId).subscribe(
      (res:any) => {
        this.comments.splice(i, 1);
        this.toastr.success('comment deleted', 'success');
      },
      err => {
        console.log(err);
        this.toastr.error('comment didnt delete', 'not success');
      }
    );
  }

  OnReply(){

  }

  OnReport(){

  }

}
