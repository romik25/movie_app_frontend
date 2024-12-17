import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.css']
})
export class AddTheatreComponent {
     
  error : boolean  = true;
  errorMessage : string =""
       theatre : any = {
        theatreName : "",
        totalSeats : 0
       }
        
     
   constructor(public dialogRef: MatDialogRef<AddTheatreComponent> , private movieService : MovieService){

   }

   onClose(): void {
    this.dialogRef.close();
  }


  addTheatre() {
    const { theatreName, totalSeats } = this.theatre;
    if (theatreName.trim() === "" || totalSeats < 50 || totalSeats > 200) {
        this.errorMessage = "All Fields are mandatory and total seats greater than 50 and less than 300";
        return;
    }

    this.movieService.addTheatre(this.theatre).subscribe(() => {
        this.dialogRef.close();
        Swal.fire("Theatre Added", "", 'success');
    }, (error) => {
        this.errorMessage = "Error adding theatre"; // Handle error case if needed
    });
}

}
