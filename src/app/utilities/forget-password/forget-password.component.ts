import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
 
    user : any = null;
    changePassword : boolean   = false;

   constructor(private authService : AuthService , private router : Router){
   }


   fetchUser(email : string){
    this.changePassword = false;
        this.authService.getUserFromEmail(email).subscribe(res=>{
          this.user = res;
        }) 
   }

   onForgetPassword(data: any){

    
     
    this.changePassword = false;
     const question =   this.user.securityAnswer.split("-")[0]
     const answer = this.user.securityAnswer.split("-")[1].trim().toLowerCase();
     const answer2 = data.securityAnswer.trim().toLowerCase();
   
     if(question == data.question && answer == answer2){
          this.changePassword = true;
     }else{
      this.changePassword = false;
       Swal.fire("Unable to Change Password" , "Security Question or answer does not match" , "info")
     }
      
   }

   
   onChangePassword(password : string , password2:string){
       if(password != password2){
        Swal.fire("Passwords are not matching" , "Make Sure Both Are Correct" , "error")
        return;
       }

        this.authService.changePassword({
          email : this.user.email,
          password : password
        }).subscribe(res=>{
          Swal.fire(res.message , "You can Sign In Now" , "success").then(()=>{
             this.changePassword = false;
             this.router.navigateByUrl("/")
          })
        })

   } 
   
}
