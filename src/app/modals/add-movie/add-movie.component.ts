import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import {MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {

      error : boolean  = true;
      errorMessage : string =""
  
       theatres : any[] = []
       movie : any = {
       movieName : "",
       description : "",
       genre : "",
       status : ""
       }

       theatreId : number = 0

   constructor( public dialogRef: MatDialogRef<AddMovieComponent> , private movieService : MovieService){
          this.getTheatres()
   }

   onClose(): void {
    this.dialogRef.close();
  }

  getTheatres(){
     this.movieService.getTheatres().subscribe(res=>this.theatres = res)
  }

  addMovie(){

      this.errorMessage = ""
     
      if(this.movie.movieName.trim() == "" || this.movie.description.trim() == ""  || this.movie.genre.trim() =="" || this.movie.status.trim() == ""){
         this.errorMessage = "All Fields are mandatory"
         return;
      }

       this.movieService.addMovie(this.movie , this.theatreId).subscribe(res=>{
           Swal.fire("Movie Added" , "" , 'success').then(()=>{
             this.dialogRef.close();
           })
       })
     
  }

}
