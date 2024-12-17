// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BookingHistoryComponent } from './booking-history.component';
// import { MovieService } from 'src/app/services/movie.service';
// import { of } from 'rxjs';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
// import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
// import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule

// describe('BookingHistoryComponent', () => {
//   let component: BookingHistoryComponent;
//   let fixture: ComponentFixture<BookingHistoryComponent>;
//   let movieServiceMock: jasmine.SpyObj<MovieService>;

//   beforeEach(async () => {
//     // Create a mock MovieService
//     movieServiceMock = jasmine.createSpyObj('MovieService', ['showBookingsByUser']);

//     await TestBed.configureTestingModule({
//       declarations: [BookingHistoryComponent],
//       providers: [
//         { provide: MovieService, useValue: movieServiceMock }
//       ],
//       imports: [
//         MatTableModule,
//         MatButtonModule,
//         MatIconModule,
//       ],
//       schemas: [NO_ERRORS_SCHEMA] // Ignore unknown components in the template
//     }).compileComponents();

//     // Mock localStorage.getItem
//     spyOn(localStorage, 'getItem').and.callFake((key) => {
//       if (key === 'id') return '1'; // Return a mock user ID
//       return null;
//     });

//     fixture = TestBed.createComponent(BookingHistoryComponent);
//     component = fixture.componentInstance;

//     // Sample booking data to return from the mock service
//     const sampleBookings = [
//       { id: 1, movieName: 'Movie A', theatreName: 'Theatre 1', bookingDate: new Date(), bookedSeats: 2, seatNumber: 'A1, A2', price: 200 },
//       { id: 2, movieName: 'Movie B', theatreName: 'Theatre 2', bookingDate: new Date(), bookedSeats: 3, seatNumber: 'B1, B2, B3', price: 300 }
//     ];

//     // Configure the mock service to return sample data
//     movieServiceMock.showBookingsByUser.and.returnValue(of(sampleBookings));

//     // Trigger the getBookings method
//     component.getBookings();
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch bookings on initialization', () => {
//     const userId = parseInt(localStorage.getItem("id") || '0', 10); // Handle potential null value
//     expect(movieServiceMock.showBookingsByUser).toHaveBeenCalledWith(userId);
//     expect(component.bookings.length).toBe(2); // Expect 2 bookings in the array
//   });

//   it('should correctly display the bookings', () => {
//     // Check if the bookings have been assigned correctly
//     expect(component.bookings).toEqual(jasmine.any(Array));
//     expect(component.bookings[0].movieName).toBe('Movie A');
//     expect(component.bookings[1].theatreName).toBe('Theatre 2');
//   });
// });
