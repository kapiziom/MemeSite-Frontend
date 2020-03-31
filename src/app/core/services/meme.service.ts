import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, observable, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  constructor(private http : HttpClient, private fb: FormBuilder) { }

  readonly BaseURI = 'https://localhost:44312/api';

   addMeme = this.fb.group({
     title :['',[Validators.required]],
     txt :'',
     image :  ['',[Validators.required]],
     categoryId : ['',[Validators.required]],
   });

  upload(fileToUpload: File, imgByteHead: string, imageBytes: string | ArrayBuffer){
    var body = {
      title: this.addMeme.value.title,
      txt: this.addMeme.value.txt,
      categoryId: this.addMeme.value.categoryId,
      fileName: fileToUpload.name,
      byteHead: imgByteHead,
      fileByte: imageBytes,      
    };
    console.log(body);
    return this.http.post(this.BaseURI+'/Meme', body);
  }

  GetContent(){
    return this.http.get(this.BaseURI+'/Meme');
  }

  getPagedContent(page : number){
    return this.http.get(this.BaseURI+'/Meme/Page/'+page);
  }

  getMemeRate(memeId:number){
    return this.http.get(this.BaseURI+'/Meme/GetRate/'+memeId);
  }

}
