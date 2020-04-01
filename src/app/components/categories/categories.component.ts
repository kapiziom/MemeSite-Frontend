import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.GetCategories();
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

}
