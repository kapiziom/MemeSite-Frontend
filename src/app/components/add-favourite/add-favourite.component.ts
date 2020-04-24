import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { MemeService } from 'src/app/core/services/meme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-favourite',
  templateUrl: './add-favourite.component.html',
  styleUrls: ['./add-favourite.component.css']
})
export class AddFavouriteComponent implements OnInit {

  @Input() memeDetails: any;

  constructor(private toastr: ToastrService,
    public userService: UserService,
    private memeService: MemeService,
    private router: Router) { }

  ngOnInit(): void {
  }

  addFavourite(){
    console.log(this.memeDetails['isFavourite']);
    console.log(this.memeDetails);
    if(this.memeDetails['isFavourite'] == false){
      this.memeService.addFavourite(this.userService.getUserId(), this.memeDetails['memeId']).subscribe(
        (res:any) => {
          this.memeDetails['isFavourite'] = true;
          this.toastr.success('addFavourite successful', 'success');
        },
        err => {
          console.log(err)
          this.toastr.error('something went wrong', 'not success');
        }
      );
    }
    else {
      this.memeService.deleteFavourite(this.memeDetails['memeId']).subscribe(
        (res:any) => {
          this.memeDetails['isFavourite'] = false;
          this.toastr.success('Deleted successful', 'success');
        },
        err => {
          console.log(err)
          this.toastr.error('something went wrong', 'not success');
        }
      );
    }
  }

}
