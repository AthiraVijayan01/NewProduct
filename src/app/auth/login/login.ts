import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const adminExists = users.find((u: any) => u.role === 'admin');

    if (!adminExists) {
      users.push({
        username: 'admin@gmail.com',
        password: 'admin',
        role: 'admin'
      });
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  CheckLogin() {

    if (this.loginForm.invalid) {
      alert("Invalid form");
      return;
    }

    const data = this.loginForm.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (u: any) =>
        u.username === data.username &&
        u.password === data.password
    );

    if (user) {
      localStorage.setItem('currentUser', user.username);
      localStorage.setItem('role', user.role);

      if (user.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/home']);
      }

    } else {
      alert("Invalid username or password");
    }
  }

  goToRegister() {
    this.router.navigate(['/registration']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgotpassword']);
  }
}


