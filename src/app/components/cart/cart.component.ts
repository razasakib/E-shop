import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/products';
import { map } from 'rxjs/operators';
import { forkJoin, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { orderInfo, productInfo, OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';

interface CartItem {
  product: Product
  quantity: number
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart;
  total=0;
  cartItems:CartItem[]=[];
  cartSubcription:Subscription;
  modalRef:BsModalRef
  constructor(private cartService: CartService,
    private modalService: BsModalService,
    private orderService:OrderService,
    private router:Router,
    private productService: ProductService) { }

  ngOnInit(): void {
     this.subscribeCart();
  }
//cart unsubscrip
  ngOnDestroy(): void {
    this.cartSubcription.unsubscribe()
 }

  subscribeCart() {
   let total=0;
   this.cartSubcription= this.cartService.cartObservable.subscribe({
      next: (cart) => {
     
        let observables = []
        total=0;
        if(Object.keys(cart).length==0){
          this.cartItems=[]
        }
        for (let id in cart) {
          console.log(id);
          observables.push(
            this.productService.getProductById(id)
              .pipe(
                map(product => {
                 total+=(product.price * cart[id])
                  let item: CartItem = {
                    product: product,
                    quantity: cart[id]
                  }
                  return item;
                })
              )
          )
        }
        forkJoin(observables).subscribe({
          next: (cartItems: CartItem[]) => {
            this.total=total;
            this.cartItems = cartItems
          }
        })

      }
    })
  }
  //open model
  openModal(form) {
    this.modalRef=this.modalService.show(form,
      {
        animated:true,
        class:'modal-lg'
      })
  }
    
  //checkout
  checkOut(event: Event,form:HTMLFormElement){
    event.preventDefault(); 
    let firstName=(<HTMLInputElement>form.elements.namedItem('firstName')).value;
    let lastName=(<HTMLInputElement>form.elements.namedItem('lastName')).value;
    let address=(<HTMLInputElement>form.elements.namedItem('address')).value;
    
let orderInfo:orderInfo;
let productInfos:productInfo[]=[];
this.cartItems.forEach(e=> {
  productInfos.push({
    price:e.product.price,
    productId:e.product._id,
    quantity:e.quantity
  })
})
orderInfo={
     address,
     firstName,
     lastName,
     products:productInfos
}

    console.log({
      orderInfo
    });
    this.orderService.placeOrder(orderInfo)
    .subscribe({

      next:(result)=>{
        this.modalRef.hide()
        this.cartService.clearCart()
       this.router.navigate(['orders']);
      },
      error:(err)=>{
         console.log({'err':'cant place order..'})
      }
    })
    return false;
  }
}
