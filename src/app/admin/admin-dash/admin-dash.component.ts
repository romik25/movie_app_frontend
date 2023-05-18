import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AddMovieComponent } from 'src/app/modals/add-movie/add-movie.component';
import { AddTheatreComponent } from 'src/app/modals/add-theatre/add-theatre.component';
import Swal from 'sweetalert2';
import { EditMovieComponent } from 'src/app/modals/edit-movie/edit-movie.component';
@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {


   movies : any[]  = []
  theatres : any[] = []
   

   constructor(private movieService : MovieService , private router :Router , public dialog: MatDialog){

   }

  ngOnInit(): void {

  
     
      this.getMovies();
      this.getTheatres();
     
  }
  

  getMovies(){
      this.movieService.getMovies().subscribe(res=>{
        this.movies = res;
         this.movies = this.movies.reverse()
      })
  }

  getTheatres(){
       this.movieService.getTheatres().subscribe(res=>{
        this.theatres = res ;
        this.theatres = this.theatres.reverse()
       })
  }

  openAddMovieDialog(enterAnimationDuration: string, exitAnimationDuration: string){
   const dialogRef =   this.dialog.open(AddMovieComponent, {
      width: '300px',
      autoFocus: false,
    });
   
     dialogRef.afterClosed().subscribe(()=>{
        this.getMovies();
     })
  
  }

  openAddTheatreDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(AddTheatreComponent, {
      width: '300px',
      autoFocus: false,
    });
  }


  editMovie(movie:any){
     this.dialog.open(EditMovieComponent  , {
         width : '300px',
         autoFocus : false,
         data : movie
     })
  }

  deleteMovie(id:number){
    Swal.fire({
      title: 'Sure to delete this movie ?',
      text: 'This activity cannot be reverted back',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
       if(result.value){
        this.movieService.deleteMovie(id).subscribe(res=>{
          Swal.fire(res.message , "" , 'success').then(()=>{
              this.getMovies();
          })
      })
       }
        
    })
  }

   deleteTheatre(id:number){


     this.movieService.getMoviesByTheatre(id).subscribe(res=>{
         if(res.length > 0){
              
            Swal.fire("Failed to Delete Theatre" , "The theatre cannot be deleted because it is associated with few movies" , 'error')
           
         }else{
         
          Swal.fire({
            title: 'Sure to delete the theatre?',
            text: 'Delete the movies which are associated with this theatre first',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
          }).then((result) => {
             if(result.value){
              this.movieService.deleteTheatre(id).subscribe(res=>{
                Swal.fire(res.message , "" , 'success').then(()=>{
                    this.getTheatres();
                })
            })
             }
              
          })
             

         }
     })

   }
}

  


