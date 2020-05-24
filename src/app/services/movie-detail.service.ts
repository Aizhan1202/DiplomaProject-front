import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailService {

  baseurl = "http://188.166.61.108:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }


getOneMovie(id): Observable<any> {
  return this.http.get(this.baseurl + '/api/movies/' + id + '/',
  {headers: this.httpHeaders});
}

getSimilarByUserRatings(movie_id): Observable<any> {
  return this.http.get(this.baseurl + '/api/movies/get_similar_by_user_ratings?id='+ movie_id,
    {headers: this.httpHeaders})
}
getSimilarByContent(movie_id): Observable<any> {
  return this.http.get(this.baseurl + '/api/movies/get_similar_by_content/?id='+ movie_id,
    {headers: this.httpHeaders})
}


////////////////////////////////RATING//////////////////////////////////
rateMovie(movie_id, rating): Observable<any> {
  const body = {id:movie_id, rating:rating};
  return this.http.post(this.baseurl + '/api/movies/rate/', body,
  {headers: this.httpHeaders})
}
getRating(id): Observable<any> {
  return this.http.get(this.baseurl + '/api/movies/rate/?id='+ id, 
    {headers: this.httpHeaders}
    )
}
//////////////////////////////////////////////////////////////////////////


///////////////////////////////// COMMENTS //////////////////////////////////////
getMovieComments(movie_id): Observable<any> {
  console.log('movie id is' + movie_id)
  return this.http.get(this.baseurl + '/api/comments/' + movie_id + '/',
  {headers: this.httpHeaders})
}

createComment(newComment): Observable<any> {
  const body = {movie: newComment.movie, reply_to: newComment.reply_to, content: newComment.content};
  return this.http.post(this.baseurl + '/api/comment/', body,
  {headers: this.httpHeaders});
}

deleteComment(id): Observable<any> {
  return this.http.delete(this.baseurl + '/api/comment/' + id + '/',
  {headers: this.httpHeaders});
}

createCommentLikes(comment): Observable<any> {
  const body = {comment: comment};
  return this.http.post(this.baseurl + '/api/comment_like/', body,
  {headers: this.httpHeaders});
}

}
