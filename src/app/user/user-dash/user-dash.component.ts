import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { MovieService } from 'src/app/services/movie.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit {

  
  movies :any[] = []
  loading  : Subject<boolean> = this.loader.isLoading
  
  constructor(private movieService : MovieService , private router : Router , private loader : LoaderService){
    
  }

  ngOnInit(): void {
 

    this.getMovies();
  }

  getMovies(){
      this.movieService.getMovies().subscribe(res=>{
        
           this.movies  = res;
        
          
          })
  }

}
