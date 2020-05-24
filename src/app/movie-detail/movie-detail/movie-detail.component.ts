import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieDetailService } from 'src/app/services/movie-detail.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { FavouritesService } from 'src/app/services/favourites.service';
import { Movie } from 'src/app/models/movies';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {
  movie: Movie;
  similarMoviesByUserRatings: Movie[];
  similarMoviesByContent: Movie[];
  comment: Comment[];
  users: User[];
  favourites: Movie[];
  InFavourite = false;
  commentLikes: {comment: number}[] = [];

  username: string;
  movie_id = Number(this.route.snapshot.paramMap.get('id'));
  newComment;

  //////////////////////////RATING/////////////////////////
  ratings: { movie_id: number, rating}[];
  rating: number;
  isNotRated = true;
  isClicked = false;

  /////////////////////////////////////////////////////////


  constructor(
    private movieDetailService: MovieDetailService,
    private favouritesService: FavouritesService,
    private route: ActivatedRoute,
    public authService: AuthService,
  ) {
    this.getOneMovie();
    this.getComment();
    this.getRating();
    // this.checkIsNotRated();
    this.getUser();
    this.getSimilarMovieByUserRatings();
    this.getSimilarMovieByContent();
    this.getFavouriteMovies();
    this.newComment = {reply_to: 1, movie: this.movie_id, created_by: 4, content: ''};
  }

  isShowDiv1 = true;
  isShowDiv2 = false;

  toggleDisplayDiv1() {
    this.isShowDiv1 = true;
    this.isShowDiv2 = false;
  }

  toggleDisplayDiv2() {
    this.isShowDiv1 = false;
    this.isShowDiv2 = true;
  }

  getOneMovie = () => {
    let id = Number(this.route.snapshot.paramMap.get('id'))
    this.movieDetailService.getOneMovie(id).subscribe(
      data => {
        this.movie = data;
        //console.log(this.movie.rating.toFixed())
      },
      error => {
        console.log(error)
      }
    )
  }


  addToFavourites() {
    this.favouritesService.createFavourite(this.movie).subscribe(
      data => {
        this.favourites.push(data);
      },
      error => {
        console.log(error);
      }
    );
     this.InFavourite = true; 
  }

  getFavouriteMovies = () => {
    this.favouritesService.getAllFavourites().subscribe(
      data => {
        this.favourites = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  cnt = 0;
  isInFavourite(){
    this.favourites.forEach(fav => {
      if(fav.id == this.movie.id) {
        this.InFavourite = true;
      }
    })
    return this.InFavourite;
  }
  changeInFavourite(){
    this.InFavourite = true; 
  }


  /////////////////////////////RATING////////////////////////////////////
  rateMovie() {
    this.movieDetailService.rateMovie(this.movie_id, this.rating).subscribe(
      data => {
        this.ratings.push(data);
      },
      error => {
        console.log(error)
      }
    )
    this.isNotRated = false;
    this.getRating();  
  }

  getRating = () => {
    let id = Number(this.route.snapshot.paramMap.get('id'))
    this.movieDetailService.getRating(id).subscribe(
      data => {
        data = this.rating = data;
      },
      error => {
        console.log(error)
      }
    )
  
  }

  checkIsNotRated() {
    if (this.rating != 0 && this.isClicked == true){
      this.isNotRated = false;
    }
    //this.isNotRated = true;
    return this.isNotRated;
  }


  ///////////////////////////////////////////////////////////////////////////////


  /////////////////////////// COMMENTS ///////////////////////////////////

  getComment = () => {
    this.movieDetailService.getMovieComments(this.movie_id).subscribe(
      data => {
        this.comment = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteComment = (id: number) => {
    this.movieDetailService.deleteComment(id).subscribe(
      data => {
        this.getComment();
      },
      error => {
        console.log(error);
      }
    );
  }


  createComment = () => {
    this.movieDetailService.createComment(this.newComment).subscribe(
      data => {
        this.comment.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }

    createCommentLikes = (comment) => {
    this.movieDetailService.createCommentLikes(comment).subscribe(
      data => {
        this.commentLikes.push(data);
      },
      error => {
        console.log(error);
      }
    );
    this.getComment();
  }

  getUser = () => {
    this.authService.getAllUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  /////////////////////////// SIMILAR MOVIES /////////////////////////////////////

  getSimilarMovieByUserRatings = () => {
    let id = Number(this.route.snapshot.paramMap.get('id'))
    this.movieDetailService.getSimilarByUserRatings(id).subscribe(
      data => {
        this.similarMoviesByUserRatings = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  getSimilarMovieByContent = () => {
    let id = Number(this.route.snapshot.paramMap.get('id'))
    this.movieDetailService.getSimilarByContent(id).subscribe(
      data => {
        this.similarMoviesByContent = data;
      },
      error => {
        console.log(error)
      }
    )
  }
}
