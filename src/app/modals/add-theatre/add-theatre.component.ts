import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.css']
})
export class AddTheatreComponent {
  
   constructor(public dialogRef: MatDialogRef<AddTheatreComponent>){

   }

   onClose(): void {
    this.dialogRef.close();
  }

}
