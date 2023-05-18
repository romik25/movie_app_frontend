import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class MovieService  {

  constructor(private http: HttpClient) { }

   headers : HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);

    getMovies():Observable<any[]>{

    
   
    
    return  this.http.get<any[]>("http://localhost:7002/api/v1/s2/movie/getAllMovies" , {
      headers : this.headers
      })
    }

    getMoviesByTheatre(theatreId:number):Observable<any[]>{
      return  this.http.get<any[]>(`http://localhost:7002/api/v1/s2/movie//getMoviesByTheatre/${theatreId}` , {
        headers : this.headers
        })
      }
    
    
    
    getMovie(id:any):Observable<any>{
        return this.http.get<any>(`http://localhost:7002/api/v1/s2/movie/${id}` , {headers : this.headers})
    }


    getTheatres():Observable<any>{
      return this.http.get<any>(`http://localhost:7002/api/v1/s2/theatre/getTheatres` , {headers : this.headers})
    }

    
    getTheatre(id:number):Observable<any>{
      return this.http.get<any>(`http://localhost:7002/api/v1/s2/theatre/${id}` , {headers : this.headers})
    }

   
    addMovie(movie : any  , theatreId : number):Observable<any> {
      return this.http.post<any>(`http://localhost:7004/api/v1/s4/movie/${theatreId}/addMovie` , movie ,  {headers : this.headers})
    }

    addTheatre(theatre : any) : Observable<any> {
      return this.http.post<any>(`http://localhost:7004/api/v1/s4/theatre/addTheatre` , theatre ,  {headers : this.headers})
    }

    updateMovie(movie : any){
      return this.http.put<any>(`http://localhost:7004/api/v1/s4/movie/updateMovie` , movie , {headers : this.headers})
    }

    updateTheatre(theatre : any){
      return this.http.put<any>(`http://localhost:7004/api/v1/s4/theatre/updateTheatre` , theatre , {headers : this.headers})
    }

    deleteMovie(movieId : any):Observable<any>{
       return this.http.delete<any>(`http://localhost:7004/api/v1/s4/movie/deleteMovieById/${movieId}` , {headers : this.headers})
    }

    deleteTheatre(theatreId : any):Observable<any>{
      return this.http.delete<any>(`http://localhost:7004/api/v1/s4/theatre/${theatreId}` , {headers : this.headers})
    }

    showBookings(movieId:number){
       return this.http.get<any[]>(`http://localhost:7003/api/v1/s3/booking/movie/tickets/${movieId}` , {headers : this.headers} )
    }

    showBookingsByUser(userId:number){
      return this.http.get<any[]>(`http://localhost:7003/api/v1/s3/booking/movie/tickets/user/${userId}` , {headers : this.headers} )
    }

    bookMovie(movieId : number , ticketDetails : any):Observable<any>{
      return this.http.post<any>(`http://localhost:7003/api/v1/s3/booking/bookTickets/${movieId}` , ticketDetails , {headers : this.headers});
    }

    



  }
