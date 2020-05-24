import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  //authToken: any;

  baseurl = "http://188.166.61.108:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(private http: HttpClient) { }

  getAllFavourites(): Observable<any>{
    // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // let header = new HttpHeaders().set(
    //   "Authorization",
    //    localStorage.getItem(currentUser.token)
    // );
    return this.http.get(this.baseurl + '/api/movies/favorite/',
    {headers: this.httpHeaders})
  }

  createFavourite(movie): Observable<any> {
    let fav_list: Array<number> = [movie.id];
    const body = {movie_ids: fav_list};
    return this.http.post(this.baseurl + '/api/movies/favorite/', body,
    {headers: this.httpHeaders});
  }
  
   deleteFavourite(id): Observable<any> {
    return this.http.delete(this.baseurl + '/api/movies/favorite?id='+id,
    {headers: this.httpHeaders});   
  }

  
    
} 



