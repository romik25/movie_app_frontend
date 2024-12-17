// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatDialogRef } from '@angular/material/dialog';
// import { AddTheatreComponent } from './add-theatre.component';
// import { MovieService } from 'src/app/services/movie.service';
// import { of, throwError } from 'rxjs';
// import Swal from 'sweetalert2';
// import chai from 'chai';
// import spies from 'chai-spies';

// const { expect } = chai;
// chai.use(spies); // Use chai-spies

// describe('AddTheatreComponent', () => {
//   let component: AddTheatreComponent;
//   let fixture: ComponentFixture<AddTheatreComponent>;
//   let movieService: jasmine.SpyObj<MovieService>;
//   let dialogRef: jasmine.SpyObj<MatDialogRef<AddTheatreComponent>>;

//   beforeEach(() => {
//     const movieServiceSpy = jasmine.createSpyObj('MovieService', ['addTheatre']);
//     const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

//     TestBed.configureTestingModule({
//       declarations: [AddTheatreComponent],
//       providers: [
//         { provide: MovieService, useValue: movieServiceSpy },
//         { provide: MatDialogRef, useValue: dialogRefSpy },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(AddTheatreComponent);
//     component = fixture.componentInstance;
//     movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
//     dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<AddTheatreComponent>>;
//   });

//   it('should close the dialog on onClose', () => {
//     component.onClose();
//     expect(dialogRef.close).to.have.been.called(); // Correct usage of chai-spies
//   });

//   it('should show error for invalid theatre data', () => {
//     component.theatre = { theatreName: '', totalSeats: 0 };
//     component.addTheatre();
//     expect(component.errorMessage).to.equal("All Fields are mandatory and total seats greater than 50 and less than 300");
//   });

//   it('should add theatre and close dialog on valid data', async () => {
//     const mockTheatre = { theatreName: 'Test Theatre', totalSeats: 100 };
//     component.theatre = mockTheatre;

//     movieService.addTheatre.and.returnValue(of({}));

//     // Mock Swal.fire to return a proper SweetAlertResult
//     const swalSpy = chai.spy.on(Swal, 'fire', () => Promise.resolve({
//         isConfirmed: true,
//         isDenied: false,
//         isDismissed: false
//     }));

//     await component.addTheatre(); // Use await for the asynchronous method

//     expect(movieService.addTheatre).to.have.been.called.with(mockTheatre); // Correct usage
//     expect(dialogRef.close).to.have.been.called(); // Correct usage
//     expect(swalSpy).to.have.been.called.with("Theatre Added", "", 'success'); // Correct usage
//   });

//   it('should handle error when adding theatre', () => {
//     const mockTheatre = { theatreName: 'Test Theatre', totalSeats: 100 };
//     component.theatre = mockTheatre;

//     movieService.addTheatre.and.returnValue(throwError(() => new Error('Error adding theatre')));

//     component.addTheatre();

//     expect(movieService.addTheatre).to.have.been.called.with(mockTheatre); // Correct usage
//     expect(dialogRef.close).not.to.have.been.called(); // Assuming you want to keep the dialog open on error
//   });
// });
