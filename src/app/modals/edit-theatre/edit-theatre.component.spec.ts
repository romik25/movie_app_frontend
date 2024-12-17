// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { EditTheatreComponent } from './edit-theatre.component';
// import { MovieService } from 'src/app/services/movie.service';
// import { of, throwError } from 'rxjs';
// import Swal from 'sweetalert2';
// import { NO_ERRORS_SCHEMA } from '@angular/core';

// describe('EditTheatreComponent', () => {
//   let component: EditTheatreComponent;
//   let fixture: ComponentFixture<EditTheatreComponent>;
//   let movieService: jasmine.SpyObj<MovieService>;
//   let dialogRef: jasmine.SpyObj<MatDialogRef<EditTheatreComponent>>;
//   const mockTheatreData = {
//     id: 1,
//     theatreName: 'Test Theatre',
//     totalSeats: 100
//   };

//   beforeEach(() => {
//     const movieServiceSpy = jasmine.createSpyObj('MovieService', ['updateTheatre']);
//     const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

//     TestBed.configureTestingModule({
//       declarations: [EditTheatreComponent],
//       providers: [
//         { provide: MovieService, useValue: movieServiceSpy },
//         { provide: MAT_DIALOG_DATA, useValue: mockTheatreData },
//         { provide: MatDialogRef, useValue: dialogRefSpy },
//       ],
//       schemas: [NO_ERRORS_SCHEMA] // Ignore any unknown components
//     }).compileComponents();

//     fixture = TestBed.createComponent(EditTheatreComponent);
//     component = fixture.componentInstance;
//     movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
//     dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<EditTheatreComponent>>;
//   });

//   it('should close the dialog on onClose', () => {
//     component.onClose();
//     expect(dialogRef.close).toHaveBeenCalled(); // Use Jasmine assertion
//   });

//   it('should show error for invalid theatre data', () => {
//     component.theatre = { theatreName: '', totalSeats: 0 }; // Invalid data
//     component.editTheatre();
//     expect(component.errorMessage).toEqual("All Fields are mandatory and total seats greater than 50 and less than 300");
//   });

//   it('should update theatre and close dialog on valid data', async () => {
//     component.theatre = { theatreName: 'Valid Theatre', totalSeats: 100 }; // Valid data
//     movieService.updateTheatre.and.returnValue(of({})); // Mocking the update call

//     // Mock Swal.fire to return a proper SweetAlertResult
//     const swalSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({
//       isConfirmed: true,
//       isDenied: false,
//       isDismissed: false
//     }));

//     await component.editTheatre(); // Use await for the asynchronous method

//     expect(movieService.updateTheatre).toHaveBeenCalledWith(component.theatre); // Use Jasmine assertion
//     expect(dialogRef.close).toHaveBeenCalled(); // Use Jasmine assertion
//     expect(swalSpy).toHaveBeenCalledWith("Theatre Updated Successfully", "", 'success'); // Use Jasmine assertion
//   });

//   it('should handle error when updating theatre', () => {
//     component.theatre = { theatreName: 'Test Theatre', totalSeats: 100 }; // Valid data
//     movieService.updateTheatre.and.returnValue(throwError(() => new Error('')));

//     component.editTheatre();

//     expect(movieService.updateTheatre).toHaveBeenCalledWith(component.theatre); // Use Jasmine assertion
//     expect(dialogRef.close).not.toHaveBeenCalled(); // Assuming you want to keep the dialog open on error
//     expect(component.errorMessage).toEqual(''); // Check error message
//   });
// });
