import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should navigate to user or admin page if token exists', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'token') {
        return 'dummy-token'; // Simulating a token
      }
      if (key === 'role') {
        return 'ROLE_USER'; // Change to ROLE_ADMIN for that test
      }
      return null;
    });
    
    component.ngOnInit();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/user'); // Check navigation
  });

  it('should show error if passwords do not match', () => {
    const formData = {
      password: 'password123',
      cpassword: 'password1234' // Mismatched password
    };
    
    component.onSubmit(formData);

    expect(component.error).toBeTrue(); // Error should be true
    expect(component.errorMessage).toBe("Passwords are not matching"); // Check error message
  });

  it('should register user and navigate on successful registration', async () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      contact: '1234567890',
      role: '1',
      password: 'password123',
      cpassword: 'password123',
      question: 'Favorite color',
      securityAnswer: 'Blue'
    };
  
    const mockResponse = { id: 1 }; // Mock response for registration
    authService.register.and.returnValue(of(mockResponse)); // Simulate successful registration
  
    await component.onSubmit(formData); // Use await for the asynchronous method
  
    expect(authService.register).toHaveBeenCalledWith(jasmine.any(Object), 1); // Check register call
  });
  
  it('should handle error during registration', () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      contact: '1234567890',
      role: '1',
      password: 'password123',
      cpassword: 'password123',
      question: 'Favorite color',
      securityAnswer: 'Blue'
    };

    authService.register.and.returnValue(throwError(() => new Error('Registration failed'))); // Simulate error response

    component.onSubmit(formData);

    expect(authService.register).toHaveBeenCalled(); // Check register call
    expect(component.error).toBeTrue(); // Ensure error state is true
    expect(component.errorMessage).toBe("Registration failed"); // Ensure error message is set
});

  afterEach(() => {
    fixture.destroy(); // Clean up after each test
  });
});
