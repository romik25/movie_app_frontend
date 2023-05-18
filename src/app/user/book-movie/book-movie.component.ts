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
     totalPrice : string = "0"
    constructor(private movieService : MovieService , private ac : ActivatedRoute , private router : Router){
        
    }

  ngOnInit(): void {
 
     this.id =  parseInt(this.ac.snapshot.paramMap.get("id"))
     this.getMovie(this.id)
  }

  getMovie(id:number){
      this.movieService.getMovie(id).subscribe(res=>{
          this.movie = res
      })
  }


  calculateTotal(booked : any){
    
     

     let price : number = 150
          
     if(booked > this.movie.seatsAvailable){
      
      this.error  =true;
      this.errorMessage = "Booked Seats cannot be greater than total number of seats available"
      return;
     }

     this.error  =false;
     this.errorMessage = ""
       
     this.totalPrice  =  price * booked + ""
      
  }


  onSubmit(bookingForm:any){
      
      setTimeout(()=>{

      } , 3000)
       
  }

  async showAlert(topic :string , message : string  , icon:SweetAlertIcon){
    //error , info , question ,success , warning
    return Swal.fire(topic, message , icon)

 }

}
