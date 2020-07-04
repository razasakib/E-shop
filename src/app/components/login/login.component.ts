import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 form:HTMLFormElement;
 error:string;
 success:string;
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  navigateToHomePage(){
    this.router.navigate(['home'])
  }
  login(event:Event){
     event.preventDefault();
    console.log(event.target);
    this.form=<HTMLFormElement>event.target
    this.readFormValue();
   


  }
  readFormValue(){
    let email=(<HTMLInputElement>this.form.elements.namedItem('email')).value;
    let password=(<HTMLInputElement>this.form.elements.namedItem('password')).value;
    let creadentials={
        email,password
    }
    console.log(creadentials);

     this.userService.login(creadentials)
     .subscribe(
     {
      /*  next:(result:{message:string,token:string})=>{
          this.success=result.message;
          this.error=undefined;
          console.log(result);*/
          //using map operator
          next:(result)=>{
            this.success=result.message;
            this.error=undefined;
            console.log(result);
            this.navigateToHomePage();

        },
        error:(response:HttpErrorResponse)=>{
          console.log(response);
          this.error=response.error.error.message;
          this.success=undefined
        }
     })
  }
}
