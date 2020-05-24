import { Component } from '@angular/core';
import { MoviesService } from './../services/movies.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Movie } from 'src/app/models/movies'

@Component({  
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  movies: Movie[] = [];
  filtered: Movie[] = [];

  constructor(private moviesService: MoviesService){
    this.getMovies();
    //this.ratingToInt();
  }

  getMovies = () => {
    this.moviesService.getAllMovies().subscribe(
      data => {
        this.movies = this.filtered = data;
      },
      error => {
        console.log(error)
      }
    )
    
  }

  getStars = (rating: number) => {
    let val = rating;
    let size = val/5*100;
    return size;
  }


  getSortedMovies = () => {
    this.moviesService.getSourtedByRating().subscribe(
      data => {
        this.movies = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  filterByName(query: string){
    this.filtered = (query) ?
      this.movies.filter(movie => movie.name.toLowerCase().includes(query.toLowerCase())) : 
      this.movies;
  }

  filterByGenre(query1: string){
    this.filtered = (query1) ?
      this.movies.filter(movie => movie.genre.toLowerCase().includes(query1.toLowerCase())) : 
      this.movies;
  }



}



