import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';

// Mock Router to avoid navigating during tests
class MockRouter {
  navigateByUrl(url: string) {
    return Promise.resolve(true); // Return a resolved Promise
  }
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [{ provide: Router, useClass: MockRouter }]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set loggedIn to true if token exists in localStorage', () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'token') {
        return 'someToken';
      }
      if (key === 'role') {
        return 'ROLE_USER';
      }
      return null;
    });
    
    component.ngOnInit();
    expect(component.loggedIn).toBeTrue();
    expect(component.role).toBe('ROLE_USER');
  });

  it('should not set loggedIn if token does not exist in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    
    component.ngOnInit();
    expect(component.loggedIn).toBeFalse();
    expect(component.role).toBe('');
  });

  it('should not call logout if the user cancels the action', async () => {
    const mockResult: SweetAlertResult = {
      isConfirmed: false,
      isDenied: false,
      isDismissed: true,
      value: false
    };

    // Mock Swal.fire to return the correct structure for cancellation
    const swalSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve(mockResult));

    spyOn(localStorage, 'removeItem').and.callThrough();
    spyOn(router, 'navigateByUrl');

    await component.logout(); // Call the logout function

    // Wait for the promise to resolve
    await fixture.whenStable();

    expect(swalSpy).toHaveBeenCalled();
    expect(localStorage.removeItem).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
