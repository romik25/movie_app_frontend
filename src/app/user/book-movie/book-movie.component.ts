import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
@Component({
  selector: 'app-book-movie',
  templateUrl: './book-movie.component.html',
  styleUrls: ['./book-movie.component.css']
})
export class BookMovieComponent implements OnInit {

     id:number = 0;
     movie : any = {}
     error : boolean  = false
     errorMessage : string = ""
     booked : boolean  = false;
     transactionDetails : any = {}
     loading : boolean  = false;
    constructor(private movieService : MovieService , private ac : ActivatedRoute , private router : Router){
        
    }

  ngOnInit(): void {
 
     this.id =  parseInt(this.ac.snapshot.paramMap.get("id"))
     this.getMovie(this.id)
     this.booked = false;
  }

  getMovie(id:number){
      this.movieService.getMovie(id).subscribe(res=>{
          this.movie = res
      })
  }


  calculateTotal(booked : any){
   
     let price : number = this.movie.ticketPrice;
          
     if(booked > this.movie.seatsAvailable){
      
      this.error  =true;
      this.errorMessage = "Booked Seats cannot be greater than total number of seats available"
      return -1;
     }

     this.error  =false;
     this.errorMessage = ""
       
       return price * booked
      
  }


  allotSeats(numberOfSeats:number){
    let seats = []
for(var i=0 ; i<numberOfSeats;i++){
    
     let alphabets = "ABCDEFGHIJKLMN";

const rand1 = Math.floor(Math.random() * (12 - 0 + 1)) + 0;
const rand2 = Math.floor(Math.random() * (24 - 0 + 1)) + 0;

 seats.push(alphabets[rand1]+rand2) 
 
}

return seats.join(",")
}


  onSubmit(bookingForm:any){
        this.loading = true;
      setTimeout(()=>{
         this.loading = false;
      } , 5000)

    this.error  =false;
    this.errorMessage = ""
      
     let seats = this.allotSeats(bookingForm.bookedSeats)

     if(seats > this.movie.seatsAvailable){
      
      this.error  =true;
      this.errorMessage = "Booked Seats cannot be greater than total number of seats available"
      return;
     }

     const data = {
      userId : localStorage.getItem("id"),
      bookedSeats : bookingForm.bookedSeats,
      seatNumber : seats,
      bookingDate : new Date(),
      price :this.calculateTotal(bookingForm.bookedSeats)
     }
      
    this.movieService.bookMovie(this.movie.id , data).subscribe(res=>{
             this.transactionDetails = res;
             this.booked = true
    })
  }


  
  async showAlert(topic :string , message : string  , icon:SweetAlertIcon){
    //error , info , question ,success , warning
    return Swal.fire(topic, message , icon)

 }

}
