// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { EditMovieComponent } from './edit-movie.component';
// import { MovieService } from 'src/app/services/movie.service';
// import { of, throwError } from 'rxjs';
// import Swal from 'sweetalert2';
// import { NO_ERRORS_SCHEMA } from '@angular/core';

// describe('EditMovieComponent', () => {
//   let component: EditMovieComponent;
//   let fixture: ComponentFixture<EditMovieComponent>;
//   let movieService: jasmine.SpyObj<MovieService>;
//   let dialogRef: jasmine.SpyObj<MatDialogRef<EditMovieComponent>>;
//   const mockMovieData = {
//     movieName: 'Test Movie',
//     description: 'Test Description',
//     genre: 'Action',
//     ticketPrice: 100,
//     status: 'Active'
//   };

//   beforeEach(() => {
//     const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getTheatres', 'updateMovie']);
//     const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

//     TestBed.configureTestingModule({
//       declarations: [EditMovieComponent],
//       providers: [
//         { provide: MovieService, useValue: movieServiceSpy },
//         { provide: MAT_DIALOG_DATA, useValue: mockMovieData },
//         { provide: MatDialogRef, useValue: dialogRefSpy },
//       ],
//       schemas: [NO_ERRORS_SCHEMA] // Ignore any unknown components
//     }).compileComponents();

//     fixture = TestBed.createComponent(EditMovieComponent);
//     component = fixture.componentInstance;
//     movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
//     dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<EditMovieComponent>>;
//   });

//   it('should retrieve theatres on init', () => {
//     const mockTheatres = [{ name: 'Theatre 1' }, { name: 'Theatre 2' }];
//     movieService.getTheatres.and.returnValue(of(mockTheatres));
    
//     component.getTheatres();

//     expect(movieService.getTheatres).toHaveBeenCalled();
//     expect(component.theatres).toEqual(mockTheatres);
//   });

//   it('should close the dialog on onClose', () => {
//     component.onClose();
//     expect(dialogRef.close).toHaveBeenCalled(); // Use Jasmine assertion
//   });

//   it('should show error for invalid movie data', () => {
//     component.movie = { ...mockMovieData, movieName: '', description: '' }; // Invalid data
//     component.editMovie();
//     expect(component.errorMessage).toEqual("All Fields are mandatory");
//   });

//   it('should update movie and close dialog on valid data', async () => {
//     component.movie = mockMovieData; // Valid data
//     movieService.updateMovie.and.returnValue(of({})); // Mocking the update call

//     // Mock Swal.fire to return a proper SweetAlertResult
//     const swalSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({
//       isConfirmed: true,
//       isDenied: false,
//       isDismissed: false
//     }));

//     await component.editMovie(); // Use await for the asynchronous method

//     expect(movieService.updateMovie).toHaveBeenCalledWith(component.movie); // Use Jasmine assertion
//     expect(dialogRef.close).toHaveBeenCalled(); // Use Jasmine assertion
//     expect(swalSpy).toHaveBeenCalledWith("Movie Successfully Updated", "", 'success'); // Use Jasmine assertion
//   });

//   it('should handle error when updating movie', () => {
//     component.movie = mockMovieData; // Valid data
//     movieService.updateMovie.and.returnValue(throwError(() => new Error('Error updating movie')));

//     component.editMovie();

//     expect(movieService.updateMovie).toHaveBeenCalledWith(component.movie); // Use Jasmine assertion
//     expect(dialogRef.close).not.toHaveBeenCalled(); // Assuming you want to keep the dialog open on error
//   });
// });
