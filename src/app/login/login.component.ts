import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
//import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  hidePassword=true; //default is hide

  
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private router:Router,
    private snackBar: MatSnackBar,
    //private cartService: CartService
  ){}

  ngOnInit():void{
    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.required]],
      password:[null,[Validators.required]],
  })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  /*onSubmit():void{
    const username=this.loginForm.get('email').value;
    const password=this.loginForm.get('password').value;
    //will be called at auth service
    this.authService.login(username,password).subscribe(
      (res)=>{
        this.snackBar.open('Login Success', 'ok',{duration:5000});
        this.router.navigate(['/products']);
      },
      (err)=>{
        this.snackBar.open('Bad credentials', 'ERROR',{duration:5000});
      }
      
    )
  }
*/

onSubmit() {
  this.username=this.loginForm.get('email').value;
  this.password=this.loginForm.get('password').value;

  console.log('Username:', this.username);
  console.log('Password:', this.password);

      // Log the username and password before sending the request
      console.log('Payload:', { username: this.username, password: this.password });

    this.authService.login(this.username, this.password).subscribe(
      (response) =>/* {
          this.message = response.message; // Adjusted to match the JSON structure
          this.message = 'Login Successful!';
          console.log(response);
          this.authService.redirectBasedOnRole(response.role);
          //this.router.navigate(['/products']);
      },*/{
        localStorage.setItem('token', response.token); // Store JWT
        localStorage.setItem('userId', response.userId); // Store user ID
        this.router.navigate(['/products']); // Redirect to cart
        // Store login status in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        // Retrieve the cart from localStorage if it exists
        const savedCart = localStorage.getItem('userCart');

        this.authService.setLoggedIn(true); // Mark as logged in
        if (savedCart) {
          const cartItems = JSON.parse(savedCart);
          // Restore the cart items (you can pass them to your cart service if needed)
         // this.cartService.saveCart(cartItems);  // Or set cartItems to your component if you need it
        }
    },
      (error) => {
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          if (error.error) {
              console.error('Error response body:', error.error);
          }
          this.message = error.error.error || 'Login Failed!'; // Handling error messages
          this.message = 'Login Failed!';
      }
  );
}

}
