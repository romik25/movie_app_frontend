import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from "sweetalert2"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
      
  error : boolean  = false
  errorMessage : string = ""

   constructor(private authService : AuthService  , private router:Router){

   }
   
  ngOnInit(): void {
    if(localStorage.getItem("token")){
        
      if(localStorage.getItem("role") == "ROLE_USER"){
          this.router.navigateByUrl("/user");
      }
      if(localStorage.getItem("role") == "ROLE_ADMIN"){
        this.router.navigateByUrl("/admin");
      }
}
  }


  onSubmit(login:any){
      
          
     this.authService.login(login).subscribe(res=>{
          const {token , id ,  type}  = res
          localStorage.setItem("token" , token)
          localStorage.setItem("id" ,id)
          localStorage.setItem("role" , type)
        
          if(type == "ROLE_USER"){
             this.router.navigateByUrl("/user").then(()=>{
                 Swal.fire("Login Success" , "Start Booking Movies Now" , "success").then(()=>{
                   window.location.reload()
                 })
             })
          }else if(type == "ROLE_ADMIN"){
            
            this.router.navigateByUrl("/admin").then(()=>{
              Swal.fire("Login Success" , "As an Administrator start managing the App" , "success").then(()=>{
                window.location.reload()
              })
          })

          }
           
        
     })

  }

  async showAlert(topic :string , message : string  , icon:SweetAlertIcon){
    //error , info , question ,success , warning
    return Swal.fire(topic, message , icon)

 }

}
