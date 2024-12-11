import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { RoleService } from './services/role.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TasteHub';
  constructor(public roleService: RoleService, public authService:AuthService, private cdr: ChangeDetectorRef ) {}
    ngOnInit(): void {
       // Simulating login; replace 'username' and 'password' with actual credentials
       this.authService.login('username', 'password').subscribe({
        next: (response) => {
          const role = response?.role?.toLowerCase();
          if (role) {
            this.roleService.setRole(role);
            localStorage.setItem('userRole', role);
            this.cdr.detectChanges();
          }
        }
      });
    }
}
