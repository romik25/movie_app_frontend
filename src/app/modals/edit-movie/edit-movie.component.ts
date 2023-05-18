import { Component , Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent {

  
     theatres : any[] = []
     data : any = {}
     errorMessage : string = ""

   constructor(public dialogRef: MatDialogRef<EditMovieComponent> ,  @Inject(MAT_DIALOG_DATA) public movie: any , private movieService : MovieService){
      console.log(movie)
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
     
  if(this.movie.movieName.trim() == "" || this.movie.description.trim() == ""  || this.movie.genre.trim() =="" || this.movie.status.trim() == ""){
     this.errorMessage = "All Fields are mandatory"
     return;
  }
      console.log(this.movie)
}

}
