import { Component , OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from "sweetalert2"
import {User} from "../user"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
      
    error : boolean  = false
    errorMessage : string = ""
    user : User =  null

     constructor(private authService : AuthService , private router:Router){

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


onSubmit(data: any) {
  if (data.password != data.cpassword) {
      this.error = true;
      this.errorMessage = "Passwords are not matching";
      return;
  }

  const { firstName, lastName, email, contact, role, password, question, securityAnswer } = data;

  this.user = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      contact: contact,
      password: password.trim(),
      email: email.trim(),
      securityAnswer: question + "-" + securityAnswer.trim()
  };

  // Reset error state
  this.error = false;
  this.errorMessage = "";

  // Send user for registration
  this.authService.register(this.user, parseInt(role.trim())).subscribe(res => {
      this.showAlert("Registration successful", `User Id Created - ${res.id}`, "success").then(() => {
          this.router.navigateByUrl("/");
      });
  }, error => {
      this.error = true; // Set error state to true
      this.errorMessage = error.message; // Set the error message
  });
}


 async showAlert(topic :string , message : string  , icon:SweetAlertIcon){
    //error , info , question ,success , warning
    return Swal.fire(topic, message , icon)

 }

}
