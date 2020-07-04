import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from 'src/app/models/products';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  products:Product[]=[]
  constructor(private productService:ProductService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next:(paramMap:ParamMap)=>{
        let categoryId=paramMap.get('category');
        let min=paramMap.get('min');
        let max=paramMap.get('max');
        console.log(categoryId);
        this.collectProduct({category:categoryId,min,max});
      }
    })
  }

  collectProduct(params){
       this.productService.getAllProducts(params)
       .subscribe({
        next:(products)=>{
          this.products=products
        // console.log(this.products)
        },
        error:(error)=>{
             console.log(error);
        }
       })
  }

}
