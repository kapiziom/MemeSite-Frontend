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

  editComment = this.fb.group({
    txt :['',[Validators.required, Validators.minLength(3), Validators.maxLength(2000)]],
  });

  getCommentsForMeme(memeId){
    return this.http.get(this.BaseURI +'/Comment/ListForMeme/' + memeId);
  }

  GetUserComments(userName: string, page: number, itemsPerPage: number){
    return this.http.get(this.BaseURI+'/Comment/PagedListForUser/'+ userName + '/' + page + '/' + itemsPerPage);
  }

  postComment(memeId){
    var body = {
      txt: this.addComment.value.txt,
      memeId: memeId,
    };
    return this.http.post(this.BaseURI +'/Comment', body);
  }

  putComment(commentId){
    var body = {
      txt: this.editComment.value.txt,
    };
    return this.http.put(this.BaseURI +'/Comment/' + commentId, body);
  }

  deleteComment(commentId){
    return this.http.delete(this.BaseURI + '/Comment/' + commentId);
  }
  
}
