import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDashComponent } from './user-dash.component';
import { MovieService } from 'src/app/services/movie.service';
import { LoaderService } from 'src/app/services/loader.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserDashComponent', () => {
  let component: UserDashComponent;
  let fixture: ComponentFixture<UserDashComponent>;
  let movieService: jasmine.SpyObj<MovieService>;
  let loaderService: jasmine.SpyObj<LoaderService>;

  beforeEach(async () => {
    // Create spies for the services
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovies']);
    const loaderServiceSpy = jasmine.createSpyObj('LoaderService', ['isLoading'], { isLoading: of(false) });

    // Configure the testing module
    await TestBed.configureTestingModule({
      declarations: [UserDashComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: LoaderService, useValue: loaderServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDashComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    loaderService = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMovies on init', () => {
    // Mock the getMovies method to return an observable
    movieService.getMovies.and.returnValue(of([])); // Return an empty array as mock data

    spyOn(component, 'getMovies').and.callThrough(); // Allow the original method to be called
    component.ngOnInit();
    expect(component.getMovies).toHaveBeenCalled(); // Check that getMovies was called
  });

  it('should fetch movies and set the movies array', () => {
    const mockMovies = [
      { id: 1, movieName: 'Movie 1', theatreName: 'Theatre 1', seatsAvailable: 10, theatre: { totalSeats: 100 } }
    ];
    movieService.getMovies.and.returnValue(of(mockMovies)); // Mock the getMovies method

    component.getMovies(); // Call the method
    expect(component.movies).toEqual(mockMovies); // Check that movies are set correctly
  });

  afterEach(() => {
    fixture.destroy(); // Clean up after each test
  });
});
