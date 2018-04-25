// services/auth.service.ts
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// We want to avoid any 'name not found'
// warnings from TypeScript
declare var Auth0Lock: any;
const httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
};
const url = "http://localhost:4000";
let token;


@Injectable()
export class AuthService{
  currentUser:Object;
    constructor(private httpClient:HttpClient){}

 login(username, password) {
     let userInfo = {username:username, password:password};
     let body = JSON.stringify(userInfo);
     
     this.httpClient.post(url+'/signin', body,httpOptions).subscribe(
         data=>{
            console.log("sign in token");

            console.log(data['token']);

            token = data['token'];
            localStorage.setItem('token', token);

            alert("now i am okay"+localStorage.getItem('token'));
        });
     return;
 }

 public authenticated() {
		return tokenNotExpired();
	}

 logout() {
   // To log out, we just need to remove
   // the user's profile and token
   localStorage.removeItem('profile');
   localStorage.removeItem('id_token');
 }

 signup(userInfo){
     let body = JSON.stringify(userInfo);
console.log("auth-service"+body);
     this.httpClient.post(url+'/signup',body).subscribe(data=>console.log(data),
    err=>console.log(err+"error")
    );
 }


 public getToken(): string {
    return localStorage.getItem('token');
  }

}
