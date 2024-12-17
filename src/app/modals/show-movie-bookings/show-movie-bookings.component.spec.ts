import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowMovieBookingsComponent } from './show-movie-bookings.component';
import { MovieService } from 'src/app/services/movie.service';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ShowMovieBookingsComponent', () => {
  let component: ShowMovieBookingsComponent;
  let fixture: ComponentFixture<ShowMovieBookingsComponent>;
  let movieService: jasmine.SpyObj<MovieService>;
  let authService: jasmine.SpyObj<AuthService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ShowMovieBookingsComponent>>;
  const mockMovieId = 1; // Sample movie ID for testing

  beforeEach(() => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['showBookings']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserFromUserId']);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [ShowMovieBookingsComponent],
      imports: [MatDialogModule, MatExpansionModule, MatCardModule, MatSlideToggleModule, BrowserAnimationsModule ],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockMovieId },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();

    // Mocking the services before component initialization
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ShowMovieBookingsComponent>>;

    // Mocking the return values of the service methods
    movieService.showBookings.and.returnValue(of([
      { id: 1, userId: 1, movieId: mockMovieId, bookingDetails: "Booking 1", bookingDate: new Date(), availableSeats: 100, bookedSeats: 5, seatNumber: "A1, A2", price: 100 },
      { id: 2, userId: 2, movieId: mockMovieId, bookingDetails: "Booking 2", bookingDate: new Date(), availableSeats: 95, bookedSeats: 3, seatNumber: "B1, B2", price: 60 }
    ]));

    authService.getUserFromUserId.and.returnValue(of({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      contact: '1234567890'
    }));

    fixture = TestBed.createComponent(ShowMovieBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Triggers lifecycle hooks
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog on close', () => {
    component.close();
    expect(dialogRef.close).toHaveBeenCalled(); // Verify the close method is called
  });

  it('should show bookings on initialization', () => {
    const mockBookings = [
        { id: 1, userId: 1, movieId: mockMovieId, bookingDetails: "Booking 1" },
        { id: 2, userId: 2, movieId: mockMovieId, bookingDetails: "Booking 2" }
    ];
    movieService.showBookings.and.returnValue(of(mockBookings)); // Return mock bookings

    component.showBookings(); // Call the method to fetch bookings

    expect(movieService.showBookings).toHaveBeenCalledWith(mockMovieId); // Check if the service method was called
    expect(component.bookings.length).toBeGreaterThan(0); // Check if bookings are set (greater than 0)
    expect(component.bookings).toEqual(mockBookings.reverse()); // Check if bookings are set correctly
});

  it('should toggle user info', () => {
    const userId = 1;
    
    // Test to show user info
    component.toggleUserInfo(userId);
    expect(authService.getUserFromUserId).toHaveBeenCalledWith(userId);
    expect(component.checked).toBe(true); // Check if checked is set to true
    expect(component.user).toEqual({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      contact: '1234567890'
    }); // Check if user info is set correctly

    // Test to collapse user info
    component.toggleUserInfo(userId);
    expect(component.checked).toBe(false); // Check if checked is set to false
    expect(component.user).toBeNull(); // Check if user info is cleared
  });

  it('should reset user info on panel collapse', () => {
    component.onCollapse({});
    expect(component.user).toBeNull(); // User info should be cleared
    expect(component.checked).toBe(false); // Toggle should be unchecked
  });
});
