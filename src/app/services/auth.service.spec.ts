import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../user'; // Ensure this path is correct

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('register', () => {
    it('should register a user and return data', () => {
      const mockUser: User = {
          firstName: '',
          lastName: '',
          contact: 0,
          email: '',
          password: '',
          securityAnswer: ''
      };
      const roleId = 1;
      const response = { message: 'User registered successfully' };

      service.register(mockUser, roleId).subscribe(res => {
        expect(res).toEqual(response);
      });

      const req = httpMock.expectOne(`http://localhost:7004/api/v1/s4/movie/${roleId}/register`);
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });
  });

  describe('login', () => {
    it('should log in and return token data', () => {
      const loginData = { username: 'test', password: 'test' };
      const response = { token: 'dummy-token' };

      service.login(loginData).subscribe(res => {
        expect(res).toEqual(response);
      });

      const req = httpMock.expectOne('http://localhost:7004/api/v1/s4/movie/login');
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });
  });

  describe('changePassword', () => {
    it('should change the password and return success message', () => {
      const changeData = { oldPassword: 'old', newPassword: 'new' };
      const response = { message: 'Password changed successfully' };

      service.changePassword(changeData).subscribe(res => {
        expect(res).toEqual(response);
      });

      const req = httpMock.expectOne('http://localhost:7001/api/v1/auth/changePassword');
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });
  });

  describe('getUserFromEmail', () => {
    it('should return user data for given email', () => {
      const email = 'test@example.com';
      const response = { id: 1, email: email, name: 'Test User' };

      service.getUserFromEmail(email).subscribe(res => {
        expect(res).toEqual(response);
      });

      const req = httpMock.expectOne(`http://localhost:7001/api/v1/auth/user/${email}`);
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });

  describe('getUserFromUserId', () => {
    it('should return user data for given user ID', () => {
      const userId = 1;
      const response = { id: userId, email: 'test@example.com', name: 'Test User' };

      service.getUserFromUserId(userId).subscribe(res => {
        expect(res).toEqual(response);
      });

      const req = httpMock.expectOne(`http://localhost:7001/api/v1/auth/userById/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });
});
