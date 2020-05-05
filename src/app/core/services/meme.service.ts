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
     txt :['',[Validators.minLength(20)]],
     image :  ['',[Validators.required]],
     categoryId : ['',[Validators.required]],
   });

   editMeme = this.fb.group({
    title :['',[Validators.required]],
    txt :['',[Validators.minLength(20)]],
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
    return this.http.post(this.BaseURI+'/Meme', body);
  }

  update(memeId){
    var body = {
      title: this.editMeme.value.title,
      txt: this.editMeme.value.txt,
      categoryId: this.editMeme.value.categoryId,
    };
    return this.http.put(this.BaseURI+'/Meme/' + memeId, body);
  }

  delete(memeId){
    return this.http.delete(this.BaseURI+'/Meme/' + memeId);
  }

  GetMemeDetail(memeId: number){
    return this.http.get(this.BaseURI+'/Meme/'+memeId);
  }

  getPagedContent(page: number, items: number){
    return this.http.get(this.BaseURI+'/Meme/'+page+'/'+items);
  }

  getCategoryPagedContent(category: string, page: number, items: number){
    return this.http.get(this.BaseURI+'/Meme/'+category+'/'+page+'/'+items);
  }

  getUnacceptedContent(page: number, items: number){
    return this.http.get(this.BaseURI+'/Meme/unAccepted/'+page+'/'+items);
  }

  getFavourites(page: number, items: number){
    return this.http.get(this.BaseURI+'/Meme/UsersFavourites/'+page+'/'+items);
  }

  changeAcceptanceStatus(value: boolean, memeId: number){
    return this.http.put(this.BaseURI+'/Meme/ChangeAccpetanceStatus/' + memeId + '/' + value, null);
  }

  changeArchiveStatus(value: boolean, memeId: number){
    return this.http.put(this.BaseURI+'/Meme/ChangeArchiveStatus/' + memeId + '/' + value, null);
  }

  addFavourite(userId, memeId){
    var body = {
      userId: userId,
      memeId: memeId,
    };
    return this.http.post(this.BaseURI+'/Favourite/AddFavourite/', body);
  }

  deleteFavourite(memeId){
    return this.http.delete(this.BaseURI+'/Favourite/DeleteFromFavourite/' + memeId);
  }


}
