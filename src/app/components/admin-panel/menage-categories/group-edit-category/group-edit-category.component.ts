import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-group-edit-category',
  templateUrl: './group-edit-category.component.html',
  styleUrls: ['./group-edit-category.component.css']
})
export class GroupEditCategoryComponent implements OnInit {

  categories: any;
  isEdit: number = null;

  constructor(public categoryService: CategoryService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
    this.categoryService.category.reset();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      (res : any) =>{
        this.categories = res;
      },
      err =>{
        console.log(err);
      },
    );
  }

  OnDelete(i, categoryId){
    this.categoryService.deleteCategory(categoryId).subscribe(
      (res:any) => {
        this.categories.splice(i, 1);
        this.toastr.success('category deleted', 'success');
      },
      err => {
        console.log(err);
        this.toastr.error(err['error']['error'], 'not success');
      }
    );
  }

  OnEdit(i){
    this.isEdit = i;
    this.categoryService.category.setValue({
      categoryName : this.categories[i]['categoryName'],
    });
  }

  SaveEdit(i, categoryId){
    if(this.categoryService.category.value.categoryName ==  this.categories[i]['categoryName']){
      this.toastr.error('There are no changes', 'not success');
      this.categoryService.category.reset();
      this.isEdit = null;
    }
    else{
      this.categoryService.putCategory(categoryId).subscribe(
        (res:any) => {
          this.isEdit = null;
          this.categories[i]['categoryName'] = res['categoryName'];
          this.categoryService.category.reset();
          this.toastr.success('category edited', 'success');
        },
        err => {
          console.log(err);
          this.isEdit = null;
          this.categoryService.category.reset();
          if(err['error']['statusCode'] == 409){
            this.toastr.error(err['error']['message']);
          }
          else this.toastr.error(err['error']['error'], 'not success');
        }
      );
    }
  }

  CancelEdit(){
    this.categoryService.category.reset();
    this.isEdit = null;
  }

}
