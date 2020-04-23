import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(public service: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.service.postCategory().subscribe(
      (res:any) => {
        this.service.category.reset();
        this.toastr.success('New category created');
      },
      err => {
        console.log(err);
        this.toastr.error(err['error']['error']);
      }
    );
  }

}
