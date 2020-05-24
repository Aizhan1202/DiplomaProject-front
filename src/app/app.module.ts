//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';

//components
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { MoviesComponent } from './movies/movies.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailComponent } from './movie-detail/movie-detail/movie-detail.component';
import { SignupComponent } from './register/signup/signup.component';
import { PremieresComponent } from './premieres/premieres/premieres.component';
import { RecommendationsComponent } from './recommendations/recommendations/recommendations.component';

//services
import { AuthService, AuthInterceptor, AuthGuard } from './services/auth.service';
import { MovieDetailService } from './services/movie-detail.service';
import { MoviesService } from './services/movies.service';
import { FavouritesService } from './services/favourites.service';
import { PremieresService } from 'src/app/services/premieres.service';
import { RecommendationsService } from './services/recommendations.service';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    MoviesComponent,
    FavouritesComponent,
    LoginComponent,
    MovieDetailComponent,
    SignupComponent,
    PremieresComponent,
    RecommendationsComponent,
  ],
  exports: [RouterModule],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgbModule,

    RouterModule.forRoot([
      {path: 'movies/premieres_of_the_week', component: PremieresComponent},
      {path: 'movies/recommend', component: RecommendationsComponent},
      {path: 'movies/favorite', component: FavouritesComponent},
      {path: 'movies', component: MoviesComponent},
      {path: 'movies/:id', component: MovieDetailComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
    ])
  ],
 
  providers: [
    AuthService,
    MoviesService,
    MovieDetailService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
