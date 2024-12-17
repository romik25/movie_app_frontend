// import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { MatDialog } from '@angular/material/dialog';
// import { of } from 'rxjs';
// import Swal from 'sweetalert2';
// import { AdminDashComponent } from './admin-dash.component';
// import { MovieService } from 'src/app/services/movie.service';
// import { MatTabsModule } from '@angular/material/tabs'; // Import MatTabsModule
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AddMovieComponent } from 'src/app/modals/add-movie/add-movie.component';
// import { AddTheatreComponent } from 'src/app/modals/add-theatre/add-theatre.component';
// import { EditMovieComponent } from 'src/app/modals/edit-movie/edit-movie.component';
// import { EditTheatreComponent } from 'src/app/modals/edit-theatre/edit-theatre.component';
// import { ShowMovieBookingsComponent } from 'src/app/modals/show-movie-bookings/show-movie-bookings.component';

// class MatDialogMock {
//   open() {
//     return {
//       afterClosed: () => of(true)
//     };
//   }
// }

// describe('AdminDashComponent', () => {
//   let component: AdminDashComponent;
//   let fixture: ComponentFixture<AdminDashComponent>;
//   let movieService: MovieService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [AdminDashComponent],
//       imports: [HttpClientTestingModule, MatTabsModule, BrowserAnimationsModule],
//       providers: [
//         MovieService,
//         { provide: MatDialog, useClass: MatDialogMock },
//       ]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AdminDashComponent);
//     component = fixture.componentInstance;
//     movieService = TestBed.inject(MovieService);
//     fixture.detectChanges();

//     spyOn(movieService, 'getMovies').and.returnValue(of([]));
//     spyOn(movieService, 'getTheatres').and.returnValue(of([]));
//   });

//   it('should delete a movie and reload movies if confirmed', fakeAsync(() => {
//     spyOn(movieService, 'deleteMovie').and.returnValue(of({ message: 'Movie deleted successfully' }));
//     spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true, isDenied: false, isDismissed: false })); // Updated mock

//     component.deleteMovie(1);
//     tick(); // Process async operations

//     expect(movieService.deleteMovie).toHaveBeenCalledWith(1);
//     expect(component.getMovies).toHaveBeenCalled();
//   }));

//   it('should delete a theatre if confirmed', fakeAsync(() => {
//     spyOn(movieService, 'getMoviesByTheatre').and.returnValue(of([]));
//     spyOn(movieService, 'deleteTheatre').and.returnValue(of({ message: 'Theatre deleted successfully' }));
//     spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true, isDenied: false, isDismissed: false })); // Updated mock

//     component.deleteTheatre(1);
//     tick(); // Process async operations

//     expect(movieService.getMoviesByTheatre).toHaveBeenCalledWith(1);
//     expect(movieService.deleteTheatre).toHaveBeenCalledWith(1);
//     expect(component.getTheatres).toHaveBeenCalled();
//   }));
// });
