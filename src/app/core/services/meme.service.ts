import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  constructor(private http : HttpClient) { }

  readonly BaseURI = 'https://localhost:44322/api';

  // uploadModel = this.fb.group({
  //   Title :'',
  //   Txt :'',
  //   Image :  '',
  //   CategoryId : ''
  // });

  upload(){
    
  }

  postFile(caption: string, fileToUpload: File) {
    const endpoint = 'https://localhost:44322/api/Image';
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);
    console.log(formData);
    return this.http
      .post(endpoint, formData);
  }
}
