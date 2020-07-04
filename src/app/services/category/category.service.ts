import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/category';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 getURL='http://localhost:3000/api/categories';

  constructor(private http:HttpClient) { }
  getAllCategories(){
   return this.http.get(this.getURL)
   .pipe(
     map(result=>{
       return <Category[]>result['categories']
     })
   )
  }
}
