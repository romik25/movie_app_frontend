import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

     loggedIn : boolean  =false;
     role : string = ""
     constructor(private router:Router){
             
     }

  ngOnInit(): void {
       if(localStorage.getItem("token")){
              this.loggedIn = true;
            this.role = localStorage.getItem("role")
       }
  }

  logout(){

    Swal.fire({
      title: 'Sure To Logout?',
      text: 'All Unsaved Changes Will be Lost',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        localStorage.removeItem("role")
        this.router.navigateByUrl("/").then(() => {
          location.reload();
        })
      }
    })
 }

}
