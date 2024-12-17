// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginComponent } from './login.component';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
// import { of } from 'rxjs';
// import Swal, { SweetAlertResult } from 'sweetalert2';
// import { FormsModule } from '@angular/forms';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let authService: jasmine.SpyObj<AuthService>;
//   let router: jasmine.SpyObj<Router>;

//   beforeEach(() => {
//     const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
//     const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

//     TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       imports: [FormsModule],
//       providers: [
//         { provide: AuthService, useValue: authServiceSpy },
//         { provide: Router, useValue: routerSpy },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
//     router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//   });

//   it('should log in and navigate to user dashboard', async () => {
//     const mockLoginResponse = {
//       token: 'dummy-token',
//       id: '123',
//       type: 'ROLE_USER'
//     };

//     // Spy on localStorage.setItem
//     spyOn(localStorage, 'setItem');
//     authService.login.and.returnValue(of(mockLoginResponse));
//     router.navigateByUrl.and.returnValue(Promise.resolve(true));

//     // Mock Swal.fire to prevent actual alerts
//     const mockSwalResult: SweetAlertResult<unknown> = {
//       isConfirmed: true,
//       isDenied: false,
//       isDismissed: false,
//       value: undefined,
//     };

//     spyOn(Swal, 'fire').and.returnValue(Promise.resolve(mockSwalResult));

//     const loginData = { username: 'user', password: 'pass' };

//     await component.onSubmit(loginData); // Await the async call

//     // Assert localStorage was set correctly
//     expect(localStorage.setItem).toHaveBeenCalledWith('token', 'dummy-token');
//     expect(localStorage.setItem).toHaveBeenCalledWith('id', '123');
//     expect(localStorage.setItem).toHaveBeenCalledWith('role', 'ROLE_USER');

//     // Assert navigation to user dashboard
//     expect(router.navigateByUrl).toHaveBeenCalledWith('/user');

//     // Check if Swal.fire was called with the correct arguments
//     expect(Swal.fire).toHaveBeenCalledWith("Login Success", "Start Booking Movies Now", "success");
//   });

//   it('should log in and navigate to admin dashboard', async () => {
//     const mockLoginResponse = {
//       token: 'dummy-token',
//       id: '123',
//       type: 'ROLE_ADMIN'
//     };

//     // Spy on localStorage.setItem
//     spyOn(localStorage, 'setItem');
//     authService.login.and.returnValue(of(mockLoginResponse));
//     router.navigateByUrl.and.returnValue(Promise.resolve(true));

//     // Mock Swal.fire to prevent actual alerts
//     const mockSwalResult: SweetAlertResult<unknown> = {
//       isConfirmed: true,
//       isDenied: false,
//       isDismissed: false,
//       value: undefined,
//     };

//     spyOn(Swal, 'fire').and.returnValue(Promise.resolve(mockSwalResult));

//     const loginData = { username: 'admin', password: 'pass' };

//     await component.onSubmit(loginData); // Await the async call

//     // Assert localStorage was set correctly
//     expect(localStorage.setItem).toHaveBeenCalledWith('token', 'dummy-token');
//     expect(localStorage.setItem).toHaveBeenCalledWith('id', '123');
//     expect(localStorage.setItem).toHaveBeenCalledWith('role', 'ROLE_ADMIN');

//     // Assert navigation to admin dashboard
//     expect(router.navigateByUrl).toHaveBeenCalledWith('/admin');

//     // Check if Swal.fire was called with the correct arguments
//     expect(Swal.fire).toHaveBeenCalledWith("Login Success", "As an Administrator start managing the App", "success");
//   });
// });
