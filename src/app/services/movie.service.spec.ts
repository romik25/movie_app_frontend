import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests remain
  });

  describe('getMovies', () => {
    it('should retrieve all movies from the API', () => {
      const mockMovies = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }];

      service.getMovies().subscribe(movies => {
        expect(movies.length).toBe(2);
        expect(movies).toEqual(mockMovies);
      });

      const req = httpMock.expectOne('http://localhost:7002/api/v1/s2/movie/getAllMovies');
      expect(req.request.method).toBe('GET');
      req.flush(mockMovies);
    });
  });

  describe('getMoviesByTheatre', () => {
    it('should retrieve movies by theatre ID', () => {
      const theatreId = 1;
      const mockMovies = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }];

      service.getMoviesByTheatre(theatreId).subscribe(movies => {
        expect(movies.length).toBe(2);
        expect(movies).toEqual(mockMovies);
      });

      const req = httpMock.expectOne(`http://localhost:7002/api/v1/s2/movie//getMoviesByTheatre/${theatreId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockMovies);
    });
  });

  describe('getMovie', () => {
    it('should retrieve a single movie by ID', () => {
      const movieId = 1;
      const mockMovie = { id: 1, title: 'Movie 1' };

      service.getMovie(movieId).subscribe(movie => {
        expect(movie).toEqual(mockMovie);
      });

      const req = httpMock.expectOne(`http://localhost:7002/api/v1/s2/movie/${movieId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockMovie);
    });
  });

  describe('getTheatres', () => {
    it('should retrieve all theatres from the API', () => {
      const mockTheatres = [{ id: 1, name: 'Theatre 1' }, { id: 2, name: 'Theatre 2' }];

      service.getTheatres().subscribe(theatres => {
        expect(theatres.length).toBe(2);
        expect(theatres).toEqual(mockTheatres);
      });

      const req = httpMock.expectOne(`http://localhost:7002/api/v1/s2/theatre/getTheatres`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTheatres);
    });
  });

  describe('getTheatre', () => {
    it('should retrieve a theatre by ID', () => {
      const theatreId = 1;
      const mockTheatre = { id: 1, name: 'Theatre 1' };

      service.getTheatre(theatreId).subscribe(theatre => {
        expect(theatre).toEqual(mockTheatre);
      });

      const req = httpMock.expectOne(`http://localhost:7002/api/v1/s2/theatre/${theatreId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTheatre);
    });
  });

  describe('addMovie', () => {
    it('should add a movie and return the added movie', () => {
      const theatreId = 1;
      const newMovie = { title: 'New Movie' };
      const addedMovie = { id: 3, title: 'New Movie' };

      service.addMovie(newMovie, theatreId).subscribe(movie => {
        expect(movie).toEqual(addedMovie);
      });

      const req = httpMock.expectOne(`http://localhost:7004/api/v1/s4/movie/${theatreId}/addMovie`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newMovie);
      req.flush(addedMovie);
    });
  });

  describe('addTheatre', () => {
    it('should add a theatre and return the added theatre', () => {
      const newTheatre = { name: 'New Theatre' };
      const addedTheatre = { id: 3, name: 'New Theatre' };

      service.addTheatre(newTheatre).subscribe(theatre => {
        expect(theatre).toEqual(addedTheatre);
      });

      const req = httpMock.expectOne(`http://localhost:7004/api/v1/s4/theatre/addTheatre`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newTheatre);
      req.flush(addedTheatre);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie and return the updated movie', () => {
      const updatedMovie = { id: 1, title: 'Updated Movie' };

      service.updateMovie(updatedMovie).subscribe(movie => {
        expect(movie).toEqual(updatedMovie);
      });

      const req = httpMock.expectOne(`http://localhost:7004/api/v1/s4/movie/updateMovie`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedMovie);
      req.flush(updatedMovie);
    });
  });

  describe('updateTheatre', () => {
    it('should update a theatre and return the updated theatre', () => {
      const updatedTheatre = { id: 1, name: 'Updated Theatre' };

      service.updateTheatre(updatedTheatre).subscribe(theatre => {
        expect(theatre).toEqual(updatedTheatre);
      });

      const req = httpMock.expectOne(`http://localhost:7004/api/v1/s4/theatre/updateTheatre`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedTheatre);
      req.flush(updatedTheatre);
    });
  });

  describe('deleteMovie', () => {
    it('should delete a movie and return a success message', () => {
      const movieId = 1;

      service.deleteMovie(movieId).subscribe(response => {
        expect(response).toEqual({ message: 'Movie deleted successfully' });
      });

      const req = httpMock.expectOne(`http://localhost:7004/api/v1/s4/movie/deleteMovieById/${movieId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ message: 'Movie deleted successfully' });
    });
  });

  describe('deleteTheatre', () => {
    it('should delete a theatre and return a success message', () => {
      const theatreId = 1;

      service.deleteTheatre(theatreId).subscribe(response => {
        expect(response).toEqual({ message: 'Theatre deleted successfully' });
      });

      const req = httpMock.expectOne(`http://localhost:7004/api/v1/s4/theatre/${theatreId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ message: 'Theatre deleted successfully' });
    });
  });

  describe('showBookings', () => {
    it('should retrieve bookings for a movie', () => {
      const movieId = 1;
      const mockBookings = [{ id: 1, user: 'User 1' }, { id: 2, user: 'User 2' }];

      service.showBookings(movieId).subscribe(bookings => {
        expect(bookings.length).toBe(2);
        expect(bookings).toEqual(mockBookings);
      });

      const req = httpMock.expectOne(`http://localhost:7003/api/v1/s3/booking/movie/tickets/${movieId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockBookings);
    });
  });

  describe('showBookingsByUser', () => {
    it('should retrieve bookings for a user by user ID', () => {
      const userId = 1;
      const mockBookings = [{ id: 1, movie: 'Movie 1' }, { id: 2, movie: 'Movie 2' }];

      service.showBookingsByUser(userId).subscribe(bookings => {
        expect(bookings.length).toBe(2);
        expect(bookings).toEqual(mockBookings);
      });

      const req = httpMock.expectOne(`http://localhost:7003/api/v1/s3/booking/movie/tickets/user/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockBookings);
    });
  });

  describe('bookMovie', () => {
    it('should book a movie and return the booking confirmation', () => {
      const movieId = 1;
      const ticketDetails = { seats: [1, 2], userId: 1 };
      const mockConfirmation = { confirmationId: 123, status: 'success' };

      service.bookMovie(movieId, ticketDetails).subscribe(confirmation => {
        expect(confirmation).toEqual(mockConfirmation);
      });

      const req = httpMock.expectOne(`http://localhost:7003/api/v1/s3/booking/bookTickets/${movieId}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(ticketDetails);
      req.flush(mockConfirmation);
    });
  });
});
