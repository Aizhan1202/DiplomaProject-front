import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "src/app/models/user";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    authToken: any;

    getAll() {
        let headers = new HttpHeaders();
        this.authToken = this.loadToken();
        return this.http.get<User[]>(`http://127.0.0.1:8000/admin/auth1/mainuser/`);
    }

    loadToken(){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const Token = localStorage.getItem(currentUser.token);
        return Token;
      }
}