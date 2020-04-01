import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http : HttpClient, private fb: FormBuilder) { }

  readonly BaseURI = 'https://localhost:44312/api';

  addComment = this.fb.group({
    txt :['',[Validators.required, Validators.minLength(3), Validators.maxLength(2000)]],
  });

  getComments(memeId){
    return this.http.get(this.BaseURI +'/Comment/List/' + memeId);
  }

  postComment(memeId){
    var body = {
      txt: this.addComment.value.txt,
      memeId: memeId,
    };
    return this.http.post(this.BaseURI +'/Comment', body);
  }
  
}
