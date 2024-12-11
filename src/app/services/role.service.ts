import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private role: string | null = null;

  // Set the role in memory
  setRole(role: string): void {
    console.log('Setting role:', role); // Debug log
    this.role = role.toLowerCase(); // Normalize
  }

  // Get the current role, checking local storage if necessary
  getRole(): string {
    if (!this.role) {
      this.role = localStorage.getItem('userRole'); // Retrieve from local storage
    }
    return this.role || 'guest'; // Default to 'guest' if role is not set
  }

  // Check if the user is a customer
  isCustomer(): boolean {
    const role = this.getRole();
    console.log('Checking if customer, role:', role); // Debug log
    return role === 'customer';
  }

  // Check if the user is an admin
  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }
}