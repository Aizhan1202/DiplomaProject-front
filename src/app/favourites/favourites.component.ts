import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FavouritesService } from './../services/favourites.service';
import { User } from "src/app/models/user";
import { Movie } from 'src/app/models/movies';
import { MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent{
  movies: Array<Movie>;
  favourites: Movie[];

  constructor( private favouritesService: FavouritesService ) {
    this.getFavouriteMovies();
  }
  
  getFavouriteMovies = () => {
    this.favouritesService.getAllFavourites().subscribe(
      data => {
        this.favourites = data;
        console.log(this.favourites.length)
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteFav = (id: number) => {
    this.favouritesService.deleteFavourite(id).subscribe(
      data => {
        this.getFavouriteMovies();
      },
      error => {
        console.log(error);
      }
    );
  }

    isEmpty(){
    if(this.favourites.length == 0) {
      return true;
    }
    return false;
  }



}
