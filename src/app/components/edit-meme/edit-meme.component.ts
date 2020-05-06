import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { MemeService } from 'src/app/core/services/meme.service';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-edit-meme',
  templateUrl: './edit-meme.component.html',
  styleUrls: ['./edit-meme.component.css']
})
export class EditMemeComponent implements OnInit {

  thenum = this.router.url.match(/\d+/)[0];
  MemeID = +this.thenum;
  meme: any;
  categories : any;

  constructor(private router: Router,
    private toastr: ToastrService,
    public userService: UserService,
    public memeService: MemeService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getMeme(this.MemeID);
    this.GetCategories();
  }

  OnSubmit(){
    this.memeService.update(this.MemeID).subscribe(
      (res : any) =>{
        this.memeService.editMeme.reset();
        this.toastr.success('Edited', 'success');
        this.router.navigateByUrl('/details/' + this.MemeID);
      },
      err =>{
        console.log(err);
        this.toastr.error('something went wrong', 'not success');
      },
    );
  }

  getMeme(MemeID){
    this.memeService.GetMemeDetail(MemeID).subscribe(
      (res : any) =>{
        this.meme = res;
        if(this.meme['userId'] != this.userService.getUserId()){
          this.router.navigateByUrl('/forbidden'); 
        }
        this.memeService.editMeme.setValue({
          title : this.meme['title'],
          txt : this.meme['txt'],
          categoryId : this.meme['category']['categoryId'],
        });
        console.log(this.meme);
      },
      err =>{
        if(err['error']['statusCode'] == 404){
          this.router.navigateByUrl('/404');
        }
        console.log(err);
      },
    );
  }

  GetCategories(){
    this.categoryService.getCategories().subscribe(
      (res : any) =>{
        this.categories = res;
      },
      err =>{
        console.log(err);
      },
    );
  }

}
