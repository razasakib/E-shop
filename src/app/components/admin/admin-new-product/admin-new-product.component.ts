import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-new-product',
  templateUrl: './admin-new-product.component.html',
  styleUrls: ['./admin-new-product.component.css']
})
export class AdminNewProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  saveCategory(categoryForm:HTMLFormElement){
    let title=(<HTMLFormElement>categoryForm.elements.namedItem('title')).value
      
      console.log({title})

  }
  saveProduct(productForm){

  }

}
