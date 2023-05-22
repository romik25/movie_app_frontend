import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import * as pdfMake from "pdfmake/build/pdfmake";  
import  * as pdfFonts from "pdfmake/build/vfs_fonts"; 
(pdfMake.vfs as any) = pdfFonts.pdfMake.vfs; 
@Component({
  selector: 'app-book-movie',
  templateUrl: './book-movie.component.html',
  styleUrls: ['./book-movie.component.css']
})
export class BookMovieComponent implements OnInit {

     id:number = 0;
     user : any = {}
     movie : any = {}
     error : boolean  = false
     errorMessage : string = ""
     booked : boolean  = false;
     transactionDetails : any = {}
     modes : any[] = ['open' , 'download' , 'print']
     loading : boolean  = false;
    constructor(private movieService : MovieService , private authService : AuthService ,  private ac : ActivatedRoute , private router : Router){
        
    }

  ngOnInit(): void {
 
     this.id =  parseInt(this.ac.snapshot.paramMap.get("id"))
     this.getMovie(this.id)
     this.booked = false;
     this.getUser()
  }

  getUser(){
     this.authService.getUserFromUserId(parseInt(localStorage.getItem("id"))).subscribe(res=>{
      this.user = res
     })
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


  generatePdf(action:string){

    console.log(open)

    let docDefinition : any = {  
      content : [
       {
         text: 'Movie Booking App - Invoice',
         fontSize: 25, 
         margin: [ 0, 0, 0, 10 ], 
         bold: true,  
         alignment: 'center',   
         color: 'skyblue'  
       },

       {
         text : 'Customer Details',
         margin: [ 0, 5, 0, 5 ],
         fontSize: 16,  
         bold: true,
         decoration: 'underline'  
       },
      
       {  
        columns: [  
            [  
                {  
                    text: this.user.firstName + ' ' + this.user.lastName,
                    margin: [ 0, 5, 0, 5 ],  
                    bold: true  
                },    
                { text: this.user.email   ,  margin: [ 0, 5, 0, 5 ]  },  
                { text: this.user.contact  ,  margin: [ 0, 5, 0, 5 ] }  
            ],  
            [  
                {  
                    text: `Date Of Booking: ${new Date(this.transactionDetails.bookingDate).toLocaleString()}`,  
                    alignment: 'right'  
                },  
                {  
                    text: `Booking Id : ${this.transactionDetails.id}`, 
                    margin: [ 0, 5, 0, 0 ], 
                    alignment: 'right'  
                }  
            ]  
        ],  
    },

    {
      text : 'Booking Details',
      bold : true,
      alignment: 'center',
      decoration : 'underline',
      margin: [ 0, 10, 0, 10 ]
  },


  {
    text : `Seat Number(s): ${this.transactionDetails.seatNumber}`,
    margin: [ 0, 10, 0, 10 ],
    bold : true,
  },



{
  layout: 'lightHorizontalLines',
  table: {

    margin: [ 0, , 0, 10 ],
    headerRows: 1,
    widths: [ '*', 'auto', 100, '*' ],

    body: [
      [ 'Movie Name', 'Theatre Name', 'Seats Booked' , 'Total Paid' ],
      [ this.transactionDetails.movieName, this.transactionDetails.theatreName, this.transactionDetails.bookedSeats, '₹ ' +this.transactionDetails.price ],
     
    ]
  }
},



{  
  columns: [  
      [{ qr: `${this.transactionDetails.id}`, fit: '100' ,  margin: [ 0, 18, 0, 5 ] }],
      
  ]  
},
{
 text : 'Guidelines',
 margin: [ 0, 25, 0, 10 ],
 bold : true,
 decoration : 'underline'
},
{
ul: [  
  'Show the ticket at the entry to the theatre',  
  'Dont Carry any Food Beverages Inside the hall',  
  'Maintain Dignity Inside the Hall',  
],  
},
{

}
 
      ],
      watermark: { text: 'Movie Booking App', fontSize: 15 },
      footer: {
        columns: [
          { text: 'System Generated Invoice', alignment: 'center' , color : 'grey'  ,margin: [ 0, 0, 0, 10 ] }
        ]
      },
      
    
   };
     
    if(action == "open"){
      pdfMake.createPdf(docDefinition).open();
    }else if(action == "download"){
      pdfMake.createPdf(docDefinition).download(`MBA-ticket-id-${this.transactionDetails.id}.pdf`)
    }else if(action == "print"){
      pdfMake.createPdf(docDefinition).print()
    }
    
  }


  reset(){
   this. transactionDetails  = {}
   this.getMovie(this.id)
   this.booked = false
  }


  
  async showAlert(topic :string , message : string  , icon:SweetAlertIcon){
    //error , info , question ,success , warning
    return Swal.fire(topic, message , icon)

 }

}
