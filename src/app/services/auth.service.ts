import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../user";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);

  private baseUrl = environment.apiBaseUrl; // Use environment base URL

  register(user: User, roleId: Number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/s4/movie/${roleId}/register`, user);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/s4/movie/login`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/auth/changePassword`, data);
  }

  getUserFromEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/v1/auth/user/${email}`);
  }

  getUserFromUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/v1/auth/userById/${userId}`, { headers: this.headers });
  }
}
