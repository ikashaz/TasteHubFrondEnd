import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable,tap } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { RoleService } from '../role.service';


//backend url
const BASIC_URL="http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // Default: logged out
  private apiUrl = 'http://localhost:8080/api/login';
  constructor(private http:HttpClient, 
              private userStorageService: UserStorageService, 
              private router:Router,
              private roleService: RoleService,
              ) { }

  //function for sign-up
  register(signupRequest:any): Observable<any>  // return observable 
  {
  return this.http.post(BASIC_URL+"api/sign-up", signupRequest);
   
  }

  //function for login
  login(username: string, password: string): Observable<any> {
    //return this.http.post(this.apiUrl, { username, password });
    return this.http.post<any>(this.apiUrl, { username, password })
    .pipe( tap (response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);  // Store the token
            
          }
          const role = response?.role?.toLowerCase();
          if (role) {
              this.roleService.setRole(role);
              localStorage.setItem('userRole', role);
              
        }
        // If the response is successful, save the username in localStorage
        if (response && response.username) {
          //display response
          console.log('API Response:', response); 
          // Save the username to localStorage (or any other data you want)
          const user = {
            username: response.username,  // Only store the username
            userId: response.id 
          };
          //localStorage.setItem('role', response.user.role);
          localStorage.setItem('user', JSON.stringify(user)); // Store the user data in localStorage
        }
      })
    );
  } 

  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status); // Update login status
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
  getLoggedInUsername(): string {
    // Replace this with your actual logic to get the logged-in user's username
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user?.username || '';
  }

  getLoggedInUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.userId ?? null;  // Return userId or an empty string if not available
  }

/*  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password }, { withCredentials: true });
  } */



  redirectBasedOnRole(role: string) {
    if (role === 'ADMIN') {
        this.router.navigate(['/add']);
    } else if (role === 'CUSTOMER') {
        this.router.navigate(['/products']);
    } 
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') && !!localStorage.getItem('user'); // Check if token exists
}

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null;
  }


  // Call the backend logout endpoint to invalidate the session
  logout(): void  {
    //const confirmation = window.confirm("Are you sure you want to log out?");
    // Remove the token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole'); // Clear role from local storage
    this.setLoggedIn(false); // Update to logged out
    //return this.http.post('/logout', {}, { withCredentials: true });
  }


  //function for login
 /* login(username: string,password: string): any{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    const body={username,password};

    //pipe method to perform some operation
    return this.http.post(BASIC_URL + 'authenticate', body, {headers,observe:'response'}).pipe(
      map((res)=>{
        const token=res.headers.get('authorization')?.substring(7);
        const user=res.body;
        if(token && user){
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true;
        }
        return false;

      })
    )
  }*/


}
