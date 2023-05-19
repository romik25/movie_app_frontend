import { Component , Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent {

  
     theatres : any[] = []
     data : any = {
      movieName : "",
      description : "",
      genre : "",
      ticketPrice : 0
  }

     errorMessage : string = ""

   constructor(public dialogRef: MatDialogRef<EditMovieComponent> ,  @Inject(MAT_DIALOG_DATA) public movie: any , private movieService : MovieService){
      this.data = movie;
      this.getTheatres();
   }


   getTheatres(){
    this.movieService.getTheatres().subscribe(res=>this.theatres = res)
 }

 onClose(): void {
  this.dialogRef.close();
}

editMovie(){
  this.errorMessage = ""
     
  if(this.movie.movieName.trim() == "" || this.movie.description.trim() == ""  || this.movie.genre.trim() =="" || this.movie.status.trim() == "" || this.movie.ticketPrice == 0){
     this.errorMessage = "All Fields are mandatory"
     return;
  }
   
  this.movie.movieName = this.movie.movieName.trim()
  this.movie.description  = this.movie.description.trim()



    this.movieService.updateMovie(this.movie).subscribe(res=>{
      this.dialogRef.close();
      Swal.fire("Movie Successfully Updated" , "" , 'success')
  })
    
}

}
