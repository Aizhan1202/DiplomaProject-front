import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseurl = "http://188.166.61.108:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any>{
    return this.http.get(this.baseurl + '/api/movies/',
    {headers: this.httpHeaders})
  } 

  getAllPremieres(): Observable<any>{
    return this.http.get(this.baseurl + '/api/movies/premieres_of_the_week/',
    {headers: this.httpHeaders})
  }

  getSourtedByRating(): Observable<any>{
    return this.http.get(this.baseurl + '/api/movies/get_sorted_by_rating/',
    {headers: this.httpHeaders})
  }

  getFavorites(): Observable<any> {
    return this.http.get(this.baseurl + '/api/movies/favorite/',
      {headers: this.httpHeaders})
  }


  getAllRecommend(): Observable<any>{
    return this.http.get(this.baseurl + '/api/movies/recommend/',
    {headers: this.httpHeaders})
  }


}
