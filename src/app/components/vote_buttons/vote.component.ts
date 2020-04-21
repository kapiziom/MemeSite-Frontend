import { Component, OnInit, Input } from '@angular/core';
import { VoteService } from 'src/app/core/services/vote.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { MemeService } from 'src/app/core/services/meme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  @Input() memeDetails: any;
  @Input() ShowArchive: boolean;
  @Input() ShowAccept: boolean;

  constructor(private voteService: VoteService,
    private toastr: ToastrService,
    public userService: UserService,
    private memeService: MemeService,
    private router: Router) { }

  ngOnInit(): void {
    console.log("elo");
    console.log(this.memeDetails);
    console.log("elo");
  }

  OnVote(memeId: number, isVoted: boolean, voteValue: number){
    if(isVoted === true){
      this.voteService.ChangeVote(voteValue, memeId).subscribe(
        (res:any) => {
          console.log(res);
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
          console.log(res);
          this.refreshRate(memeId);
          this.memeDetails['voteValue'] = voteValue;
          this.memeDetails['isVoted'] = true;
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

  OnArchive(isArchived: boolean, memeId: number){
    console.log(isArchived, memeId);
    this.memeService.changeArchiveStatus(isArchived, memeId).subscribe(
      (res:any) => {
        this.memeDetails.isArchived = isArchived;
        this.toastr.success('isArchived = ' + isArchived, 'success');
      },
      err => {
        console.log(err);
        this.toastr.error('something went wrong', 'not success');
      }
    );
  }

  OnAccept(isAccepted: boolean, memeId: number){
    console.log(isAccepted, memeId);
    this.memeService.changeAcceptanceStatus(isAccepted, memeId).subscribe(
      (res:any) => {
        this.memeDetails.isAccepted = isAccepted;
        this.toastr.success('isAccepted = ' + isAccepted, 'success');
      },
      err => {
        console.log(err);
        this.toastr.error('something went wrong', 'not success');
      }
    );
  }

  OnEdit(memeId: number){
    this.router.navigateByUrl('/edit/' + memeId).then(() => {
      window.location.reload();
    });
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

}
