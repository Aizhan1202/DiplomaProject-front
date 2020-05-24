import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service'

@Component({
  selector: 'app-premieres',
  templateUrl: './premieres.component.html',
  styleUrls: ['./premieres.component.css']
})
export class PremieresComponent implements OnInit {
  premieres: {name: string, genre: string, id: number, description: string}[];

  constructor(private moviesService: MoviesService) {
    this.getPremieres();
   }

  getPremieres = () => {
    this.moviesService.getAllPremieres().subscribe(
      data => {
        this.premieres = data;
        console.log(this.premieres.length)
      },
      error => {
        console.log(error)
      }
    )
  }

  isEmpty(){
    if(this.premieres.length == 0) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {
  }

}
