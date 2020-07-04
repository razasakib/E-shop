import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Product } from 'src/app/models/products';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
   getAllProductUrl='http://localhost:3000/api/products'

 
  constructor(private http:HttpClient,private userService:UserService) { }

  getAllProducts(params){
    let query=new URLSearchParams()
    if(params['category']){
      query.append('category',params['category'])
    }
    if(params['min']){
      query.append('min',params['min'])
    }
    if(params['max']){
      query.append('max',params['max'])
    }
    console.log(query.toString())

      return this.http.get(`${this.getAllProductUrl}?${query.toString()}`,
        {
          headers : {
               'authorization' : this.userService.getToken()
               

          }
        })
        .pipe(
          map((result:{count:number , products:Product[]})=>{
            return result.products
          })
        )
  }

  getProductById(id:string){
    return this.http.get(`${this.getAllProductUrl}/${id}`,
      {
        headers : {
             'authorization' : this.userService.getToken()
             

        }
      })
      .pipe(
        map((result)=>{
          return <Product>result
        })
      )
}

}
