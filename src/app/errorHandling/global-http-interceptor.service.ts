import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , catchError, finalize, of } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GlobalHttpInterceptorService implements HttpInterceptor {

  constructor(private router : Router , private loader : LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
          this.loader.show();

       return next.handle(req).pipe(

        finalize(() => this.loader.hide()),

            catchError(error=>{

            if (error.error instanceof ErrorEvent) {
              console.error("Error Caused From App");
              
            } else {

            
                   if(error instanceof HttpErrorResponse){
                     let status:number = error.status;
                     let message:string = error.error.error;
                     switch(status){
             
                      case 400 :
                        
                        this.showAlert("Something Went Wrong" , message ,  "error")
       
                      break;

                      case 401:      
                      this.showAlert("Something Went Wrong" , message ,  "error").then(()=>{
                        this.router.navigateByUrl("/");
                      })
                    
                      break;
       
                      case  403 :
       
                      this.showAlert("Something Went Wrong" , message ,  "error")
       
                      break;

                      case  404 :
       
                      this.showAlert("Something Went Wrong" , message ,  "error")
       
                      break;
       
                      case 500 : 
       
                      this.showAlert("Something Went Wrong" , message ,  "error")
       
                      break;

                      case 502 : 
       
                      this.showAlert("Session Expired" , "Please Log In Again" ,  "error").then(()=>{
                        localStorage.removeItem("token")
                        localStorage.removeItem("role")
                        this.router.navigateByUrl("/").then(()=>{
                        window.location.reload()
                        })
                      })
                         
                      break;
                     
                 }
                   }
                  }
                  

                   return of(error);
           })

       )

  }

  async showAlert(topic :string , message : string  , icon:SweetAlertIcon){
    //error , info , question ,success , warning
    return Swal.fire(topic, message , icon)

 }
}
