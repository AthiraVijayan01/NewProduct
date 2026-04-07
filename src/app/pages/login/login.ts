import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  FormControl } from '@angular/forms';
import { FormBuilder, FormGroup,Validators , ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule ,ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'], 
})

export class Login implements OnInit{

// loginObj:any={
//   username:'',
//   password:''
// };

// constructor(private router: Router) {}
// // loginObj: { username: string; password: string } = 
// // { username: '', password: '' };

// ngOnInit(){
//     console.log("Login loaded");
//   }
//   CheckLogin(){
//   if (this.loginObj.username =='abc' && this.loginObj.password =='123') {
//   // alert("success")
//   console.log("haiiiiii")
//   this.router.navigate(['/home']);
// } 
// else {
//   alert("Wrong")
//   }
// }


  loginForm!: FormGroup; //form group named loginForm

  constructor(private fb: FormBuilder, private router: Router) {} //used->to inject from builder 

  ngOnInit() {

    this.loginForm = this.fb.group({        //creates a FormGroup
      username: ['', [Validators.required,Validators.email]], //required--> make the field required ,email validations
      password: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(6)]]
    });  //FormGroup has two controls: username and password.

    // console.log("Login loaded");
  }

  CheckLogin() {

    const data = this.loginForm.value;

    // if (data.username === 'abc' && data.password === '123') {
    if(this.loginForm.valid)
      {
      // console.log("Login success");
      this.router.navigate(['/home']);
    }
    else {
      alert("Wrong username or password");
    }
  }
  goToRegister() {
  this.router.navigate(['/registration']); 
}
  get f() {
    return this.loginForm.controls;
  }

  goToForgotPassword() {
  this.router.navigate(['/forgotpassword']);
}

}


