import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent {

   bookings : any[] = [];
   displayedColumns: string[] = ['Booking Id' , 'Movie Name', 'Theatre' ,  'Booking Date', 'Seats Booked', 'Seat Number' , 'Price' ];
  
  constructor(private movieService : MovieService){
        this.getBookings();
  }


  getBookings(){
       this.movieService.showBookingsByUser(parseInt(localStorage.getItem("id"))).subscribe(res=>{
           this.bookings = res.reverse();
       })
  }

}
