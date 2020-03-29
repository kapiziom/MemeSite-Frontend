import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
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

  upload(fileToUpload: File, imageBytes: string){
    var body = {
      title: this.addMeme.value.title,
      txt: this.addMeme.value.txt,
      categoryId: this.addMeme.value.categoryId,
      fileName: fileToUpload.name,
      fileByte: imageBytes,      
    };
    console.log(body);
    return this.http.post(this.BaseURI+'/Meme', body);
  }

}
