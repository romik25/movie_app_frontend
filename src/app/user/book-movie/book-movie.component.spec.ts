import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookMovieComponent } from './book-movie.component';
import { MovieService } from 'src/app/services/movie.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { BufferOptions } from 'pdfmake/interfaces';

describe('BookMovieComponent', () => {
  let component: BookMovieComponent;
  let fixture: ComponentFixture<BookMovieComponent>;
  let movieService: jasmine.SpyObj<MovieService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovie', 'bookMovie']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserFromUserId']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [BookMovieComponent],
      imports: [ MatIconModule, FormsModule],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1', // Mocked movie ID
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookMovieComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Mock data
    const mockMovie = { id: 1, ticketPrice: 100, seatsAvailable: 50 };
    const mockUser = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', contact: '1234567890' };

    movieService.getMovie.and.returnValue(of(mockMovie));
    authService.getUserFromUserId.and.returnValue(of(mockUser));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie details on init', () => {
    expect(movieService.getMovie).toHaveBeenCalledWith(1);
    expect(component.movie).toEqual({ id: 1, ticketPrice: 100, seatsAvailable: 50 });
  });

  it('should calculate total correctly', () => {
    const total = component.calculateTotal(5); // Assuming 5 booked seats
    expect(total).toBe(500); // 5 seats * ticket price of 100
  });

  it('should not allow booking more seats than available', () => {
    component.calculateTotal(60); // More than available seats
    expect(component.error).toBeTrue();
    expect(component.errorMessage).toBe('Booked Seats cannot be greater than total number of seats available');
  });

  it('should book movie and set transaction details', () => {
    const bookingForm = { bookedSeats: 2 }; // Mock booking form input

    movieService.bookMovie.and.returnValue(of({ id: 1, seatNumber: 'A1,A2', movieName: 'Test Movie', theatreName: 'Test Theatre', bookedSeats: 2, price: 200 }));

    component.onSubmit(bookingForm);

    expect(movieService.bookMovie).toHaveBeenCalledWith(component.movie.id, jasmine.any(Object));
    expect(component.transactionDetails).toEqual(jasmine.objectContaining({ id: 1, seatNumber: 'A1,A2', movieName: 'Test Movie', theatreName: 'Test Theatre', bookedSeats: 2, price: 200 }));
    expect(component.booked).toBeTrue();
  });
});
