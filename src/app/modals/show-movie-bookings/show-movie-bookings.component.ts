import { Component , Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-show-movie-bookings',
  templateUrl: './show-movie-bookings.component.html',
  styleUrls: ['./show-movie-bookings.component.css']
})
export class ShowMovieBookingsComponent {

    bookings : any[] = []
    color: ThemePalette = 'accent';
    checked = false;
    user : any = null
    
  
   constructor(public dialogRef: MatDialogRef<ShowMovieBookingsComponent> ,  @Inject(MAT_DIALOG_DATA) public movieId: number , private movieService : MovieService , private authService : AuthService){
     this.showBookings()
   }

   close(){
    this.dialogRef.close()
   }


   showBookings(){
       this.movieService.showBookings(this.movieId).subscribe(res=>{
         this.bookings = res.reverse();
       })
   }
   

   onCollapse(event:any){
      this.user = null;
      this.checked = false;
   }


   toggleUserInfo(userId : number){
      
    this.checked =  !this.checked
       if(this.checked){
          this.getUser(userId)
       }else{
        this.user = null
       }
   }
  getUser(userId: number) {
      this.authService.getUserFromUserId(userId).subscribe(res=>{
         this.user = res;
      })
  }

}
