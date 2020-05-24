import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';




@Injectable({ providedIn: 'root' })
export class AuthService {

    private apiRoot = 'http://188.166.61.108:8000/auth/';

    constructor(private http: HttpClient) { }


    private saveSession(authResult) {
        const token = authResult.token;
        const payload = <JWTPayload> jwtDecode(token);
        const expiresAt = moment.unix(payload.exp);
    
        localStorage.setItem('token', authResult.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
      }

      get token(): string {
        return localStorage.getItem('token');
      }

    
      login(username: string, password: string) {
        localStorage.setItem('username', username);
        return this.http.post(
          this.apiRoot.concat('login/'),
          { username, password }
        ).pipe(
          tap(response => this.saveSession(response)),
        );
      }
    
      register(username: string, email: string, firstName: string, lastName: string, password: string) {
        return this.http.post(
            this.apiRoot.concat('register/'),
            { username, email, firstName, lastName, password }
          ).pipe(
            tap(response => this.saveSession(response)),
            shareReplay(),
          );
      }
    
      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('username');
      }
    
      refreshToken() {
        if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
          return this.http.post(
            this.apiRoot.concat('refresh-token/'),
            { token: this.token }
          ).pipe(
            tap(response => this.saveSession(response)),
            shareReplay(),
          ).subscribe();
        }
      }
    
      getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
    
        return moment(expiresAt);
      }
    
      isLoggedIn() {
        return moment().isBefore(this.getExpiration());
      }
    
      isNotLoggedIn() {
        return !this.isLoggedIn();
      }

      httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
      getAllUsers(): Observable<any>{
        return this.http.get('http://188.166.61.108:8000/auth/auth1/',
        {headers: this.httpHeaders})
      }

}



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.authService.refreshToken();

      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['login']);

      return false;
    }
  }
}

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}


