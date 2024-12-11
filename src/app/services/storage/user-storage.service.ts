import { Injectable } from '@angular/core';

const TOKEN='ecom-token';
const USER='ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token:string):void{
    window.localStorage.removeItem(TOKEN);//remove existed token
    window.localStorage.setItem(TOKEN,token);
  }

  public saveUser(user):void{
    window.localStorage.removeItem(USER);//remove existed user
    window.localStorage.setItem(TOKEN,JSON.stringify(user));
  }
}
