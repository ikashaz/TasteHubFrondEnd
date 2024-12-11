import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; //to show error to user
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup; // Use non-null assertion if you're sure it will be initialized
  hidePassword = true; 

  constructor(private fb: FormBuilder,
    private snackBar:MatSnackBar,
    private authService: AuthService,
    private router: Router) { 

    }


  ngOnInit(): void { //to controll the signup form
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],// Ensure 'name' field is included
      email: [null, [Validators.required,Validators.email]],
      username: [null, [Validators.required]], // Add this line
      password: [null, [Validators.required]], 
      confirmPassword: [null, [Validators.required]] 
      
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const password= this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    if(password !== confirmPassword){
      this.snackBar.open('Passwords do not match', 'OK');
      return;
    }

    this.authService.register(this.signupForm.value).subscribe(
      (response) => {
        this.snackBar.open('sign up successfully','close',{duration:5000});
        this.router.navigate(['/login']); //if success will go to login page
      },
      (error) => {
        this.snackBar.open('Error signing up', 'close',{duration:5000, panelClass: 'error-snackbar'});
      }
    )

  }
}