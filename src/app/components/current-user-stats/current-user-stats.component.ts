import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-user-stats',
  templateUrl: './current-user-stats.component.html',
  styleUrls: ['./current-user-stats.component.css']
})
export class CurrentUserStatsComponent implements OnInit {

  stats: any;

  constructor(public userService: UserService,
    private profileService: ProfileService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserStats();
  }

  getUserStats(){
    this.profileService.GetUserStats(this.userService.getUserName()).subscribe(
      (res : any) =>{
        this.stats = res;
      },
      err =>{
        console.log(err);
      },
    );
  }

  GoSettings(){
    this.router.navigateByUrl('/settings');
  }

}
