import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../User"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  

  register(user:User , roleId:Number):Observable<any>{

    return this.http.post(`http://localhost:7001/api/v1/auth/${roleId}/register` , user);
          
  }

  login(data:any): Observable<any>{
    
    return this.http.post('http://localhost:7001/api/v1/auth/login' , data)
     
  }


}
