import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service'

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  recommendations: {name: string, genre: string, id: number, description: string}[];

  constructor(private moviesService: MoviesService) {
    this.getRecommendations()
   }

  getRecommendations = () => {
    this.moviesService.getAllRecommend().subscribe(
      data => {
        this.recommendations = data;
        console.log(this.recommendations.length)
      },
      error => {
        console.log(error)
      }
    )
  }

  ngOnInit(): void {
  }

}
