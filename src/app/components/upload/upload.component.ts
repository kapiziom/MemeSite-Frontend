import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { MemeService } from '../../core/services/meme.service';
 
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers:[MemeService]
})
export class UploadComponent implements OnInit {

  imageUrl : string = "assets/img/noimg.jpg";
  fileToUpload : File = null;
 
  constructor(private memeServie : MemeService) { }
 
  ngOnInit() {
  }

  handleFileInput(file : FileList){
    this.fileToUpload = file.item(0);
    //img preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmit(Title,Image){
    console.log(Title.value, this.fileToUpload, Image.value);
    
    this.memeServie.postFile(Title.value, this.fileToUpload).subscribe(
      data => {
        console.log('done');
        Title.value = null;
        Image.value = null;
        this.imageUrl = "assets/img/noimg.jpg";
      }
    );
  }
 
 
}