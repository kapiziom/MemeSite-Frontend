import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-by-category',
  templateUrl: './by-category.component.html',
  styleUrls: ['./by-category.component.css']
})
export class ByCategoryComponent implements OnInit {

  category: string;
  src: string;
  

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getCategoryName();
  }

  getCategoryName(){
    this.src = this.router.url;
    const route = this.src.split('/');
    this.category = route[2];
    console.log(this.category);
  }

}
