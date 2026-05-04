import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.html',
  styleUrls: ['./forgotpassword.css'],
})
export class ForgotPassword {
  forgotForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  sendResetLink() {
    if (this.forgotForm.invalid) {
      alert('Please enter a valid email');
      return;
    }
    console.log(this.forgotForm.value);
    alert('Reset link sent to your email!');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}