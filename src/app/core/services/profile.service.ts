import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, observable, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient, private fb: FormBuilder) { }

  readonly BaseURI = 'https://localhost:44312/api';

  GetUserStats(userName: string){
    return this.http.get(this.BaseURI+'/User/userStats/'+userName);
  }

  GetCurrentUserStats(){
    return this.http.get(this.BaseURI+'/User/CurrentUserStats');
  }

  GetUsersForAdmin(page: number, itemsPerPage: number){
    return this.http.get(this.BaseURI+'/User/ListUsersForAdmin/' + page + '/' + itemsPerPage);
  }

  GetUserContent(userName: string, page: number, itemsPerPage: number){
    return this.http.get(this.BaseURI+'/Meme/UserContent/'+ userName + '/' + page + '/' + itemsPerPage);
  }

}
