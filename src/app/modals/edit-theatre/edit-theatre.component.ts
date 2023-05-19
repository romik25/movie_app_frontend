import { Component , Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-theatre',
  templateUrl: './edit-theatre.component.html',
  styleUrls: ['./edit-theatre.component.css']
})
export class EditTheatreComponent {


  data : any = {
      
      theatreName : "",
      totalSeats : 0
}
errorMessage : string = ""
  
  constructor(public dialogRef: MatDialogRef<EditTheatreComponent> ,  @Inject(MAT_DIALOG_DATA) public theatre: any , private movieService : MovieService){
       this.data = theatre;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  editTheatre(){
    this.errorMessage = ""
  
     
    const {theatreName , totalSeats} = this.theatre
    if(theatreName.trim() == "" || totalSeats <50 || totalSeats > 200){
      this.errorMessage = "All Fields are mandatory and total seats greater than 50 and less than 300"
      return;
    }
  
  
      this.movieService.updateTheatre(this.theatre).subscribe(res=>{
        this.dialogRef.close();
        Swal.fire("Theatre Updated Successfully" , "" , 'success')
          
  
      })
  }

}
