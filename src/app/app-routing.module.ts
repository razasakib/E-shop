import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminNewProductComponent } from './components/admin/admin-new-product/admin-new-product.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'orders',component:UserOrdersComponent},
  {path:'cart',component:CartComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'admin',component:AdminHomeComponent,
   children:[
     {path:'',redirectTo:'dashboard',pathMatch:'full'},
     {path:'dashboard',component:AdminDashboardComponent},
     {path:'orders',component:AdminOrdersComponent},
     {path:'products',component:AdminProductsComponent},
     {path:'addProduct',component:AdminNewProductComponent},
     {path:'customers',component:AdminCustomersComponent}




   ]}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
