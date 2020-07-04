import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/models/order';





@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderPlaceUrl = 'http://localhost:3000/api/orders';
  UserAllOrdersUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient, private userService: UserService, ) { }
  placeOrder(orderInfo: orderInfo) {
     let headers=new HttpHeaders({
       'authorization':this.userService.getToken()
     })
     return this.http.post(this.orderPlaceUrl,orderInfo,{headers})
  }
  getUserOrders() {
    let headers=new HttpHeaders({
      'authorization':this.userService.getToken()
    })
    return this.http.get(this.UserAllOrdersUrl,{headers}).pipe(
      map((result:{count:number,orders:Order[]})=>{
          return result.orders;
      })
    )
 }

}
export interface orderInfo{
  firstName:string;
  lastName:string;
  address:string;
  products:productInfo[]
}
export interface productInfo{
  productId:string;
  quantity:number;
  price:number;
}
