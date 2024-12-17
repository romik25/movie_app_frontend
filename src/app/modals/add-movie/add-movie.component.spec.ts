// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AddMovieComponent } from './add-movie.component';
// import { MovieService } from 'src/app/services/movie.service';
// import { MatDialogRef } from '@angular/material/dialog';
// import { FormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';
// import { MatInputModule } from '@angular/material/input';
// import { MatDialogModule } from '@angular/material/dialog';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { of, throwError } from 'rxjs';
// import Swal from 'sweetalert2';

// // Create a mock for the MovieService
// class MockMovieService {
//   getTheatres() {
//     return of([{ id: 1, theatreName: 'Theatre 1', totalSeats: 100 }, { id: 2, theatreName: 'Theatre 2', totalSeats: 200 }]);
//   }

//   addMovie() {
//     return of({ success: true });
//   }
// }

// // Mock MatDialogRef
// const mockDialogRef = {
//   close: jasmine.createSpy('close')
// };

// describe('AddMovieComponent', () => {
//   let component: AddMovieComponent;
//   let fixture: ComponentFixture<AddMovieComponent>;
//   let movieService: MovieService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [AddMovieComponent],
//       imports: [
//         MatDialogModule,
//         BrowserAnimationsModule,
//         FormsModule,
//         MatSelectModule,
//         MatInputModule,
//         MatFormFieldModule
//       ],
//       providers: [
//         { provide: MovieService, useClass: MockMovieService },
//         { provide: MatDialogRef, useValue: mockDialogRef }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(AddMovieComponent);
//     component = fixture.componentInstance;
//     movieService = TestBed.inject(MovieService);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch theatres on initialization', () => {
//     component.getTheatres();
//     expect(component.theatres.length).toBeGreaterThan(0);
//     expect(component.theatres[0].theatreName).toBe('Theatre 1');
//   });

//   it('should add a movie successfully', () => {
//     component.movie = {
//       movieName: 'Inception',
//       description: 'A mind-bending thriller',
//       genre: 'Sci-Fi',
//       status: 'Available',
//       ticketPrice: 10
//     };
//     component.theatreId = 1;

//     spyOn(movieService, 'addMovie').and.returnValue(of({ success: true })); // Mock successful addMovie

//     component.addMovie();

//     expect(movieService.addMovie).toHaveBeenCalledWith(component.movie, component.theatreId);
//     expect(mockDialogRef.close).toHaveBeenCalled();
//     expect(Swal.fire).toHaveBeenCalledWith('Movie Added', '', 'success');
//   });

//   it('should show error message for invalid form', () => {
//     component.movie = {
//       movieName: '',
//       description: '',
//       genre: '',
//       status: '',
//       ticketPrice: 0
//     };

//     component.addMovie();

//     expect(component.errorMessage).toBe('All Fields are mandatory'); // Check if error message is set
//     expect(mockDialogRef.close).not.toHaveBeenCalled(); // Ensure dialog is not closed
//   });

//   it('should handle error when adding a movie', () => {
//     spyOn(movieService, 'addMovie').and.returnValue(throwError('Error')); // Mock error for addMovie
//     component.movie = {
//       movieName: 'Inception',
//       description: 'A mind-bending thriller',
//       genre: 'Sci-Fi',
//       status: 'Available',
//       ticketPrice: 10
//     };
//     component.theatreId = 1;

//     component.addMovie();

//     expect(Swal.fire).toHaveBeenCalledWith('Error', 'Failed to add movie', 'error');
//   });

//   it('should handle error when fetching theatres', () => {
//     spyOn(movieService, 'getTheatres').and.returnValue(throwError('Error')); // Mock error for getTheatres

//     component.getTheatres();

//     expect(Swal.fire).toHaveBeenCalledWith('Error', 'Failed to load theatres', 'error');
//   });
// });
