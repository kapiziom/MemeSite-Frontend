import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }

  readonly BaseURI = 'https://localhost:44312/api';

  category = this.fb.group({
    categoryName : ['',[Validators.required, Validators.maxLength(14)]],
  });

  getCategories(){
    return this.http.get(this.BaseURI+'/Category');
  }

  deleteCategory(id : number){
    return this.http.delete(this.BaseURI+'/Category/'+id);
  }
  putCategory(id : number){
    var body = {
      categoryName : this.category.value.categoryName,
    };
    return this.http.put(this.BaseURI+'/Category/'+id, body);
  }
  postCategory(){
    var body = {
      categoryName : this.category.value.categoryName,
    };
    return this.http.post(this.BaseURI+'/Category/', body);
  }
}