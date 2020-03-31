import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-user',
  templateUrl: './check-user.component.html',
  styleUrls: ['./check-user.component.css']
})
export class CheckUserComponent implements OnInit {

  userName: string;
  src: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName(){
    this.src = this.router.url;
    const route = this.src.split('/');
    this.userName = route[2];
    console.log(this.userName);
  }

}
