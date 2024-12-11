import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

    constructor(private router: Router,private authService:AuthService) {}

    // Trigger the logout process
    onLogout(): void {
      
      // Show confirmation alert
    const confirmation = window.confirm("Are you sure you want to log out?");
    
    if (confirmation) {
        // Perform logout logic (e.g., clear user session, redirect, etc.)
        this.authService.logout();
        console.log("User logged out");           
      // Optionally, redirect the user to the login page
      this.router.navigate(['/login']);  // Or redirect to the home page or any other page
    } else {
        // Optionally handle cancel action
        console.log("Logout cancelled");
    }

    }
  }

