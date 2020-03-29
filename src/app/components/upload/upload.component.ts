import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient, HttpResponse } from '@angular/common/http';
import { MemeService } from 'src/app/core/services/meme.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
 
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers:[MemeService]
})
export class UploadComponent implements OnInit {

  imageUrl : string = "assets/img/noimg.jpg";
  fileToUpload : File = null;
  imageByte = null;
  categories : any;
  selectedCategory : any;
 
  constructor(public memeServie : MemeService, private categoryService : CategoryService, private toastr : ToastrService) { }
 
  ngOnInit(): void {
    this.GetCategories();
  }

  handleFileInput(file : FileList){
    this.fileToUpload = file.item(0);
    //img preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
      this.imageByte = reader.result;
      //console.log(this.imageByte);
    }
    reader.readAsDataURL(this.fileToUpload);
    //console.log(this.fileToUpload);
  }

  OnSubmit(){
     this.memeServie.upload(this.fileToUpload, this.imageByte).subscribe(
       (res:any) => {
           this.memeServie.addMeme.reset();
           this.imageUrl = "assets/img/noimg.jpg"
           this.imageByte = null;
           this.toastr.success('New meme uploaded', 'success');
       },
       err => {
         console.log(err);
         this.toastr.error('New meme didnt upload', 'not success');
       }
     );
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