import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http : HttpClient, private fb: FormBuilder) { }

  readonly BaseURI = 'https://localhost:44312/api';

  send(voteValue: number, memeId: number){
    var body = {
      value: voteValue,
      memeRefId: memeId,
    };
    return this.http.post(this.BaseURI+'/Vote/SendVote', body);
  }
  
}
