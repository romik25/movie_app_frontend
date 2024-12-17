import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgetPasswordComponent } from './forget-password.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

class MockAuthService {
  getUserFromEmail(email: string) {
    return of({ email: email, securityAnswer: 'What is your pet name?-dog' });
  }
  changePassword(data: any) {
    return of({ message: 'Password changed successfully!' });
  }
}

class MockRouter {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('ForgetPasswordComponent', () => {
  let component: ForgetPasswordComponent;
  let fixture: ComponentFixture<ForgetPasswordComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgetPasswordComponent],
      imports: [MatIconModule, MatCardModule, FormsModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgetPasswordComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user information by email', () => {
    const email = 'test@example.com';
    component.fetchUser(email);
    expect(component.user).toEqual({ email: email, securityAnswer: 'What is your pet name?-dog' });
  });

  it('should set changePassword to true if security question and answer match', () => {
    component.fetchUser('test@example.com');
    
    const data = {
      question: 'What is your pet name?',
      securityAnswer: 'dog'
    };

    component.onForgetPassword(data);
    expect(component.changePassword).toBeTrue();
  });

  it('should show an alert if the security question or answer does not match', async () => {
    spyOn(Swal, 'fire').and.callThrough();
    component.fetchUser('test@example.com');

    const data = {
      question: 'What is your pet name?',
      securityAnswer: 'wrongAnswer'
    };

    component.onForgetPassword(data);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Unable to Change Password",
      "Security Question or answer does not match",
      "info"
    );
  });

  it('should show an alert if passwords do not match during password change', async () => {
    spyOn(Swal, 'fire').and.callThrough();
    component.onChangePassword('password123', 'password321');
    expect(Swal.fire).toHaveBeenCalledWith(
      "Passwords are not matching",
      "Make Sure Both Are Correct",
      "error"
    );
  });

  it('should change the password successfully', async () => {
    spyOn(Swal, 'fire').and.callThrough();
    component.fetchUser('test@example.com');
    
    component.onForgetPassword({ question: 'What is your pet name?', securityAnswer: 'dog' });
    component.onChangePassword('newPassword', 'newPassword');

    expect(Swal.fire).toHaveBeenCalledWith(
      'Password changed successfully!',
      'You can Sign In Now',
      'success'
    );
  });

  afterEach(() => {
    // Clean up after each test
    fixture.destroy();
  });
});
