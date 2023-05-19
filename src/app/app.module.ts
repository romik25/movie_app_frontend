import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http"
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './utilities/navbar/navbar.component';
import { FooterComponent } from './utilities/footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminDashComponent } from './admin/admin-dash/admin-dash.component';
import { UserDashComponent } from './user/user-dash/user-dash.component';
import { BookMovieComponent } from './user/book-movie/book-movie.component';
import { GlobalHttpInterceptorService } from './errorHandling/global-http-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { AddMovieComponent } from './modals/add-movie/add-movie.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { AddTheatreComponent } from './modals/add-theatre/add-theatre.component';
import { EditTheatreComponent } from './modals/edit-theatre/edit-theatre.component';
import { EditMovieComponent } from './modals/edit-movie/edit-movie.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import { ShowMovieBookingsComponent } from './modals/show-movie-bookings/show-movie-bookings.component';
import { BookingHistoryComponent } from './user/booking-history/booking-history.component';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ForgetPasswordComponent } from './utilities/forget-password/forget-password.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    AdminDashComponent,
    UserDashComponent,
    BookMovieComponent,
    AddMovieComponent,
    AddTheatreComponent,
    EditTheatreComponent,
    EditMovieComponent,
    ShowMovieBookingsComponent,
    BookingHistoryComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatTableModule,
    MatExpansionModule,
    MatSlideToggleModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
