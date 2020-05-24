import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PremieresService {

  baseurl = "http://127.0.0.1:8000/api/movies";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getAllPremieres(): Observable<any>{
    return this.http.get(this.baseurl + '/premieres_of_the_week/',
    {headers: this.httpHeaders})
  } 

}
