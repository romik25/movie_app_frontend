import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../User"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  headers : HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
  

  register(user:User , roleId:Number):Observable<any>{

    return this.http.post<any>(`http://localhost:7004/api/v1/s4/movie/${roleId}/register` , user);
          
  }

  login(data:any): Observable<any>{
    
    return this.http.post<any>('http://localhost:7004/api/v1/s4/movie/login' , data)
    
  }

  changePassword(data : any):Observable<any>{
    return this.http.post<any>(`http://localhost:7001/api/v1/auth/changePassword` , data);
  }

  getUserFromEmail(email:string):Observable<any>{
    return this.http.get<any>(`http://localhost:7001/api/v1/auth/user/${email}`);
  }

  getUserFromUserId(userId : number) : Observable<any>{
    return this.http.get<any>(`http://localhost:7001/api/v1/auth/userById/${userId}` , {headers : this.headers});
  }


}
