import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http : HttpClient, private fb: FormBuilder) { }

  readonly BaseURI = 'https://localhost:44312/api';

  sendVote = this.fb.group({
    value :'',
    memeIdRef :'',
  });

  send(voteValue: number, memeId: number){
    var body = {
      value: voteValue,
      memeRefId: memeId,
    };
    console.log(body);
    return this.http.post(this.BaseURI+'/Vote', body);
  }
  
}
