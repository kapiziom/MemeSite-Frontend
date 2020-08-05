import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient, HttpResponse } from '@angular/common/http';
import { MemeService } from 'src/app/core/services/meme.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers:[MemeService]
})
export class UploadComponent implements OnInit {

  imageUrl : string = "assets/img/noimg.jpg";
  fileToUpload : File = null;
  imageByte : string | ArrayBuffer;
  imgByteHead : string;
  categories : any;
  selectedCategory : any;

  src: string;

  clicked = false;
 
  constructor(public memeService : MemeService, private categoryService : CategoryService, private toastr : ToastrService) { }
 
  ngOnInit(): void {
    this.GetCategories();
  }

  handleFileInput(file : FileList){
    this.fileToUpload = file.item(0);
    //img preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
      this.src = <string>reader.result;
      const img = this.src.split(',');
      this.imageByte = img[1];
      this.imgByteHead = img[0];
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(){
     this.memeService.upload(this.fileToUpload, this.imgByteHead, this.imageByte).subscribe(
       (res:any) => {
          this.memeService.addMeme.reset();
          this.imageUrl = "assets/img/noimg.jpg"
          this.imageByte = null;
          this.toastr.success('New meme uploaded', 'success');
          this.clicked = false;
       },
       err => {
          console.log(err);
          this.toastr.error('New meme didnt upload', 'not success');
          this.clicked = false;
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